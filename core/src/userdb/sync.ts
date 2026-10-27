// Two-way sync of user.db with a per-account remote store (Firestore in the app, an
// in-memory fake in the tests). The device database stays the source of truth and the
// app works the same signed out; sync only makes devices converge.
//
// What moves: one document per tasting note (with its aromas and guesses), per study
// status and per review card. Settings stay on the device. Each document carries the
// row's updated_at, and the newer copy wins everywhere: on the device when pulling, and
// on the server when pushing (the Firestore rules refuse an older write). A sync pulls
// first, so an edit made offline on one device does not overwrite a newer edit that
// another device already uploaded.
//
// What to upload comes from sync_outbox, filled by triggers (migration 4). Rows applied
// from the server are taken back out of the outbox so they are not echoed back.

import type { Db, SqlValue } from './db.ts';
import { MIGRATIONS } from './migrations.ts';
import { MAX_PHOTO_BASE64, MAX_THUMB_BASE64 } from './photos.ts';
import { getSetting, setSetting } from './settings.ts';

export type SyncKind = 'note' | 'progress' | 'card';
export type SyncRow = Record<string, SqlValue>;

export interface SyncDoc {
  kind: SyncKind;
  id: string;
  /** The row's updated_at (ISO-8601); the newer document wins. */
  updatedAt: string;
  /** MIGRATIONS.length of the app that wrote it. */
  schemaVersion: number;
  /** The row itself; a note also carries its aromas, guesses and label photo (without note_id). */
  data: { row: SyncRow; aromas?: SyncRow[]; guesses?: SyncRow[]; photo?: SyncRow | null };
}

export interface Remote {
  /**
   * Documents the server received after `cursor` (null: from the start), oldest first,
   * and the cursor to continue from. Returning a document twice is harmless.
   */
  pull(cursor: string | null): Promise<{ docs: SyncDoc[]; cursor: string | null }>;
  /** Stores documents; the server keeps its copy when that one is newer. */
  push(docs: readonly SyncDoc[]): Promise<void>;
}

export interface SyncResult {
  pulled: number;
  applied: number;
  pushed: number;
}

const TABLES: Record<SyncKind, { table: string; key: string }> = {
  note: { table: 'tasting_note', key: 'id' },
  progress: { table: 'content_status', key: 'content_id' },
  card: { table: 'review_card', key: 'card_id' },
};

const UID = 'sync.uid';
/** The schema version that added label photos (migration 5). */
const PHOTO_SCHEMA = 5;
const CURSOR = 'sync.cursor';

/**
 * Ties this device's data to an account. On the first sign-in, or when a different
 * account signs in, everything on the device is queued for upload and the download
 * starts from the beginning. Returns whether the account changed.
 */
export async function bindAccount(db: Db, uid: string): Promise<boolean> {
  if ((await getSetting(db, UID)) === uid) return false;
  await db.transaction(async () => {
    await setSetting(db, UID, uid);
    await db.run('DELETE FROM setting WHERE key = ?', [CURSOR]);
    await db.run("INSERT OR IGNORE INTO sync_outbox (kind, id) SELECT 'note', id FROM tasting_note");
    await db.run("INSERT OR IGNORE INTO sync_outbox (kind, id) SELECT 'progress', content_id FROM content_status");
    await db.run("INSERT OR IGNORE INTO sync_outbox (kind, id) SELECT 'card', card_id FROM review_card");
  });
  return true;
}

/** The account this device last synced with, if any. */
export function boundAccount(db: Db): Promise<string | null> {
  return getSetting(db, UID);
}

/** How many changes are waiting to be uploaded. */
export async function pendingChanges(db: Db): Promise<number> {
  return (await db.get<{ n: number }>('SELECT COUNT(*) AS n FROM sync_outbox'))?.n ?? 0;
}

/** Pulls what other devices uploaded, then pushes local changes. */
export async function syncOnce(db: Db, remote: Remote, batchSize = 200): Promise<SyncResult> {
  if (!(await getSetting(db, UID))) throw new Error('Sign in before syncing.');
  const result: SyncResult = { pulled: 0, applied: 0, pushed: 0 };

  let cursor = await getSetting(db, CURSOR);
  for (let page = 0; page < 1000; page++) {
    const { docs, cursor: next } = await remote.pull(cursor);
    for (const doc of docs) {
      result.pulled++;
      // A document this version cannot store (bad values, a newer constraint) is skipped
      // rather than blocking every later one.
      if (await applyDoc(db, doc).catch(() => false)) result.applied++;
    }
    if (next !== null && next !== cursor) await setSetting(db, CURSOR, next);
    if (docs.length === 0 || next === cursor) break;
    cursor = next;
  }

  for (;;) {
    const queued = await db.all<{ seq: number; kind: SyncKind; id: string }>('SELECT seq, kind, id FROM sync_outbox ORDER BY seq LIMIT ?', [batchSize]);
    if (queued.length === 0) break;
    const docs: SyncDoc[] = [];
    for (const q of queued) {
      const doc = await buildDoc(db, q.kind, q.id);
      if (doc) docs.push(doc);
    }
    if (docs.length) await remote.push(docs);
    result.pushed += docs.length;
    // Only the entries uploaded: a change made meanwhile has a new seq and stays queued.
    for (const q of queued) await db.run('DELETE FROM sync_outbox WHERE seq = ?', [q.seq]);
  }
  return result;
}

/** Forgets the account on this device; the data stays. */
export async function unbindAccount(db: Db): Promise<void> {
  await db.run('DELETE FROM setting WHERE key IN (?, ?)', [UID, CURSOR]);
}

async function buildDoc(db: Db, kind: SyncKind, id: string): Promise<SyncDoc | null> {
  const t = TABLES[kind];
  const row = await db.get<SyncRow>(`SELECT * FROM ${t.table} WHERE ${t.key} = ?`, [id]);
  if (!row) return null;
  const data: SyncDoc['data'] = { row };
  if (kind === 'note') {
    data.aromas = await db.all<SyncRow>('SELECT aroma_id, stage FROM tasting_note_aroma WHERE note_id = ? ORDER BY stage, aroma_id', [id]);
    data.guesses = await db.all<SyncRow>('SELECT rank, profile_id, score FROM tasting_note_guess WHERE note_id = ? ORDER BY rank', [id]);
    data.photo = await db.get<SyncRow>('SELECT mime, width, height, data, thumb, updated_at FROM tasting_note_photo WHERE note_id = ?', [id]);
  }
  return { kind, id, updatedAt: String(row.updated_at), schemaVersion: MIGRATIONS.length, data };
}

const SAFE_COLUMN = /^[a-z_]+$/;
const columnCache = new WeakMap<Db, Map<string, Set<string>>>();

/** Columns this device's schema has, so a document from a newer app version still applies. */
async function columns(db: Db, table: string): Promise<Set<string>> {
  let byTable = columnCache.get(db);
  if (!byTable) columnCache.set(db, (byTable = new Map()));
  let cols = byTable.get(table);
  if (!cols) {
    cols = new Set((await db.all<{ name: string }>('SELECT name FROM pragma_table_info(?)', [table])).map((c) => c.name));
    byTable.set(table, cols);
  }
  return cols;
}

async function known(db: Db, table: string, row: SyncRow): Promise<SyncRow> {
  const cols = await columns(db, table);
  const out: SyncRow = {};
  for (const [k, v] of Object.entries(row)) if (SAFE_COLUMN.test(k) && cols.has(k)) out[k] = v ?? null;
  return out;
}

async function upsert(db: Db, table: string, row: SyncRow, key: string): Promise<void> {
  const cols = Object.keys(row);
  const updates = cols.filter((c) => c !== key).map((c) => `${c} = excluded.${c}`);
  await db.run(
    `INSERT INTO ${table} (${cols.join(', ')}) VALUES (${cols.map(() => '?').join(', ')})
     ON CONFLICT (${key}) DO ${updates.length ? `UPDATE SET ${updates.join(', ')}` : 'NOTHING'}`,
    cols.map((c) => row[c] ?? null),
  );
}

/** Applies a downloaded document when it is newer than the local row. */
async function applyDoc(db: Db, doc: SyncDoc): Promise<boolean> {
  const t = TABLES[doc.kind];
  if (!t || typeof doc.updatedAt !== 'string' || !doc.data?.row) return false;
  const local = await db.get<{ updated_at: string }>(`SELECT updated_at FROM ${t.table} WHERE ${t.key} = ?`, [doc.id]);
  if (local && String(local.updated_at) >= doc.updatedAt) return false;

  const row = await known(db, t.table, { ...doc.data.row, [t.key]: doc.id, updated_at: doc.updatedAt });
  await db.transaction(async () => {
    await upsert(db, t.table, row, t.key);
    if (doc.kind === 'note') {
      await db.run('DELETE FROM tasting_note_aroma WHERE note_id = ?', [doc.id]);
      await db.run('DELETE FROM tasting_note_guess WHERE note_id = ?', [doc.id]);
      for (const a of doc.data.aromas ?? []) {
        await db.run('INSERT OR IGNORE INTO tasting_note_aroma (note_id, aroma_id, stage) VALUES (?, ?, ?)', [doc.id, a.aroma_id ?? null, a.stage ?? null]);
      }
      for (const g of doc.data.guesses ?? []) {
        await db.run('INSERT OR REPLACE INTO tasting_note_guess (note_id, rank, profile_id, score) VALUES (?, ?, ?, ?)', [
          doc.id,
          g.rank ?? null,
          g.profile_id ?? null,
          g.score ?? null,
        ]);
      }
      // Written by an app from before label photos (schema 5): it knows nothing about the
      // photo, so keep ours rather than read its silence as a removal.
      if (doc.schemaVersion >= PHOTO_SCHEMA) {
        await db.run('DELETE FROM tasting_note_photo WHERE note_id = ?', [doc.id]);
        const p = doc.data.photo;
        if (p && typeof p.data === 'string' && p.data.length <= MAX_PHOTO_BASE64) {
          const thumb = typeof p.thumb === 'string' && p.thumb.length <= MAX_THUMB_BASE64 ? p.thumb : null;
          await db.run('INSERT INTO tasting_note_photo (note_id, mime, width, height, data, thumb, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)', [
            doc.id,
            p.mime ?? 'image/jpeg',
            p.width ?? 0,
            p.height ?? 0,
            p.data,
            thumb,
            p.updated_at ?? doc.updatedAt,
          ]);
        }
      }
    }
    // The writes above queued this row for upload; it came from the server, so drop it.
    await db.run('DELETE FROM sync_outbox WHERE kind = ? AND id = ?', [doc.kind, doc.id]);
  });
  return true;
}
