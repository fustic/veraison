// JSON export and import of everything in user.db. Used for backups now,
// for sharing notes with friends, and as the seed format for a future sync.

import type { Db, SqlValue } from './db.ts';
import { MIGRATIONS } from './migrations.ts';

const TABLES = ['tasting_note', 'tasting_note_aroma', 'tasting_note_guess', 'tasting_note_photo', 'content_status', 'review_card', 'setting'] as const;
type Table = (typeof TABLES)[number];

export interface UserExport {
  format: 'veraison-user-data';
  schemaVersion: number;
  exportedAt: string;
  tables: Record<Table, Record<string, SqlValue>[]>;
}

export async function exportUserData(db: Db, exportedAt: string): Promise<UserExport> {
  const tables = {} as UserExport['tables'];
  for (const table of TABLES) {
    tables[table] = await db.all<Record<string, SqlValue>>(`SELECT * FROM ${table}`);
  }
  return { format: 'veraison-user-data', schemaVersion: MIGRATIONS.length, exportedAt, tables };
}

/**
 * Merges an export into this database. For rows with updated_at, the newer row wins;
 * child rows of a note are replaced only when the note itself was taken from the import.
 */
export async function importUserData(db: Db, data: UserExport): Promise<{ notes: number; statuses: number }> {
  if (data.format !== 'veraison-user-data') throw new Error('Not a Veraison export file.');
  if (data.schemaVersion > MIGRATIONS.length) throw new Error('This export comes from a newer app version. Update the app first.');

  let notes = 0;
  let statuses = 0;
  await db.transaction(async () => {
    for (const row of data.tables.tasting_note ?? []) {
      const local = await db.get<{ updated_at: string }>('SELECT updated_at FROM tasting_note WHERE id = ?', [row.id ?? null]);
      if (local && String(local.updated_at) >= String(row.updated_at)) continue;
      await upsertRow(db, 'tasting_note', row, 'id');
      await db.run('DELETE FROM tasting_note_aroma WHERE note_id = ?', [row.id ?? null]);
      await db.run('DELETE FROM tasting_note_guess WHERE note_id = ?', [row.id ?? null]);
      for (const child of (data.tables.tasting_note_aroma ?? []).filter((a) => a.note_id === row.id)) {
        await insertRow(db, 'tasting_note_aroma', child);
      }
      for (const child of (data.tables.tasting_note_guess ?? []).filter((g) => g.note_id === row.id)) {
        await insertRow(db, 'tasting_note_guess', child);
      }
      // Exports from before label photos (schema 5) say nothing about them: keep ours.
      if (data.schemaVersion >= 5) {
        await db.run('DELETE FROM tasting_note_photo WHERE note_id = ?', [row.id ?? null]);
        for (const child of (data.tables.tasting_note_photo ?? []).filter((p) => p.note_id === row.id)) {
          await insertRow(db, 'tasting_note_photo', child);
        }
      }
      notes += 1;
    }
    for (const row of data.tables.content_status ?? []) {
      const local = await db.get<{ updated_at: string }>('SELECT updated_at FROM content_status WHERE content_id = ?', [
        row.content_id ?? null,
      ]);
      if (local && String(local.updated_at) >= String(row.updated_at)) continue;
      await upsertRow(db, 'content_status', row, 'content_id');
      statuses += 1;
    }
    for (const row of data.tables.review_card ?? []) {
      const local = await db.get<{ updated_at: string }>('SELECT updated_at FROM review_card WHERE card_id = ?', [row.card_id ?? null]);
      if (local && String(local.updated_at) >= String(row.updated_at)) continue;
      await upsertRow(db, 'review_card', row, 'card_id');
    }
  });
  return { notes, statuses };
}

const SAFE_COLUMN = /^[a-z_]+$/;

function columnsOf(row: Record<string, SqlValue>): string[] {
  const cols = Object.keys(row);
  for (const c of cols) if (!SAFE_COLUMN.test(c)) throw new Error(`Unexpected column in import: ${c}`);
  return cols;
}

async function insertRow(db: Db, table: Table, row: Record<string, SqlValue>): Promise<void> {
  const cols = columnsOf(row);
  await db.run(
    `INSERT OR REPLACE INTO ${table} (${cols.join(', ')}) VALUES (${cols.map(() => '?').join(', ')})`,
    cols.map((c) => row[c] ?? null),
  );
}

async function upsertRow(db: Db, table: Table, row: Record<string, SqlValue>, key: string): Promise<void> {
  const cols = columnsOf(row);
  const updates = cols.filter((c) => c !== key).map((c) => `${c} = excluded.${c}`).join(', ');
  await db.run(
    `INSERT INTO ${table} (${cols.join(', ')}) VALUES (${cols.map(() => '?').join(', ')})
     ON CONFLICT (${key}) DO UPDATE SET ${updates}`,
    cols.map((c) => row[c] ?? null),
  );
}
