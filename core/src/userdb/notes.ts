// Tasting notes: save, read, list, delete. Notes are soft-deleted so a future
// sync can propagate deletions.

import type { ProfileMatch } from '../scorer.ts';
import type { Observation, TastingNote, TastingNoteInput, WineReveal, WineType } from '../sat.ts';
import type { Db, Deps, SqlValue } from './db.ts';

interface NoteRow {
  id: string;
  created_at: string;
  updated_at: string;
  mode: 'practice' | 'exam';
  wine_type: WineType;
  clarity: number | null;
  app_intensity: number | null;
  colour: string | null;
  observations: string;
  nose_condition: number | null;
  nose_intensity: number | null;
  development: number | null;
  sweetness: number | null;
  acidity: number | null;
  tannin: number | null;
  alcohol: number | null;
  body: number | null;
  flavour_intensity: number | null;
  finish: number | null;
  palate_same_as_nose: number;
  quality: number | null;
  readiness: number | null;
  revealed_profile_id: string | null;
  label_text: string | null;
  photo_path: string | null;
  free_notes: string | null;
  revealed_at: string | null;
  reveal_grapes: string;
  reveal_producer: string | null;
  reveal_vintage: number | null;
  reveal_nv: number;
  reveal_country: string | null;
  reveal_region: string | null;
  reveal_price: number | null;
  reveal_currency: string | null;
  reveal_abv: number | null;
}

const COLUMNS = [
  'id', 'created_at', 'updated_at', 'mode', 'wine_type',
  'clarity', 'app_intensity', 'colour', 'observations',
  'nose_condition', 'nose_intensity', 'development',
  'sweetness', 'acidity', 'tannin', 'alcohol', 'body', 'flavour_intensity', 'finish',
  'palate_same_as_nose', 'quality', 'readiness',
  'revealed_profile_id', 'label_text', 'photo_path', 'free_notes',
  'revealed_at', 'reveal_grapes', 'reveal_producer', 'reveal_vintage', 'reveal_nv',
  'reveal_country', 'reveal_region', 'reveal_price', 'reveal_currency', 'reveal_abv',
] as const;

const REVEAL_COLUMNS = COLUMNS.slice(COLUMNS.indexOf('reveal_grapes'));

function revealValues(r: WineReveal | null): SqlValue[] {
  return r
    ? [JSON.stringify(r.grapes), r.producer, r.vintage, r.nonVintage ? 1 : 0, r.country, r.region, r.price, r.currency, r.abv]
    : ['[]', null, null, 0, null, null, null, null, null];
}

function revealOf(row: NoteRow): WineReveal | null {
  if (!row.revealed_at) return null;
  return {
    grapes: JSON.parse(row.reveal_grapes) as string[],
    producer: row.reveal_producer,
    vintage: row.reveal_vintage,
    nonVintage: row.reveal_nv === 1,
    country: row.reveal_country,
    region: row.reveal_region,
    price: row.reveal_price,
    currency: row.reveal_currency,
    abv: row.reveal_abv ?? null,
  };
}

/** Trims text fields and drops empty grapes so blank inputs are stored as null. */
export function cleanReveal(r: WineReveal): WineReveal {
  const text = (v: string | null) => (v && v.trim() ? v.trim() : null);
  return {
    grapes: [...new Set(r.grapes.map((g) => g.trim()).filter(Boolean))],
    producer: text(r.producer),
    vintage: r.nonVintage ? null : r.vintage,
    nonVintage: r.nonVintage,
    country: text(r.country),
    region: text(r.region),
    price: r.price !== null && Number.isFinite(r.price) && r.price >= 0 ? r.price : null,
    currency: r.price !== null ? text(r.currency) : null,
    abv: r.abv !== null && Number.isFinite(r.abv) && r.abv > 0 && r.abv < 25 ? r.abv : null,
  };
}

function toRow(id: string, createdAt: string, updatedAt: string, n: TastingNoteInput): SqlValue[] {
  return [
    id, createdAt, updatedAt, n.mode, n.wineType,
    n.appearance.clarity, n.appearance.intensity, n.appearance.colour, JSON.stringify(n.appearance.observations),
    n.nose.condition, n.nose.intensity, n.nose.development,
    n.palate.sweetness, n.palate.acidity, n.palate.tannin, n.palate.alcohol, n.palate.body,
    n.palate.flavourIntensity, n.palate.finish,
    n.palate.aromaIds === null ? 1 : 0, n.conclusions.quality, n.conclusions.readiness,
    n.revealedProfileId, n.labelText, n.photoPath, n.freeNotes,
    n.reveal ? updatedAt : null, ...revealValues(n.reveal),
  ];
}

export async function saveTastingNote(db: Db, input: TastingNoteInput, deps: Deps): Promise<string> {
  const now = deps.clock.now();
  const id = input.id ?? deps.newId();
  const existing = await db.get<{ created_at: string }>('SELECT created_at FROM tasting_note WHERE id = ?', [id]);
  const createdAt = existing?.created_at ?? now;

  const placeholders = COLUMNS.map(() => '?').join(', ');
  const updates = COLUMNS.filter((c) => c !== 'id' && c !== 'created_at')
    .map((c) => `${c} = excluded.${c}`)
    .join(', ');

  await db.transaction(async () => {
    await db.run(
      `INSERT INTO tasting_note (${COLUMNS.join(', ')}) VALUES (${placeholders})
       ON CONFLICT (id) DO UPDATE SET ${updates}, deleted_at = NULL`,
      toRow(id, createdAt, now, input),
    );
    await db.run('DELETE FROM tasting_note_aroma WHERE note_id = ?', [id]);
    for (const aromaId of new Set(input.nose.aromaIds)) {
      await db.run('INSERT INTO tasting_note_aroma (note_id, aroma_id, stage) VALUES (?, ?, ?)', [id, aromaId, 'nose']);
    }
    for (const aromaId of new Set(input.palate.aromaIds ?? [])) {
      await db.run('INSERT INTO tasting_note_aroma (note_id, aroma_id, stage) VALUES (?, ?, ?)', [id, aromaId, 'palate']);
    }
  });
  return id;
}

/**
 * Stores the "what is this?" suggestions shown when the note was finished. With `deps`,
 * the note counts as changed, so sync carries the guesses to other devices.
 */
export async function saveGuesses(db: Db, noteId: string, matches: readonly ProfileMatch[], deps?: Deps): Promise<void> {
  await db.transaction(async () => {
    if (deps) await db.run('UPDATE tasting_note SET updated_at = ? WHERE id = ?', [deps.clock.now(), noteId]);
    await db.run('DELETE FROM tasting_note_guess WHERE note_id = ?', [noteId]);
    let rank = 1;
    for (const m of matches) {
      await db.run('INSERT INTO tasting_note_guess (note_id, rank, profile_id, score) VALUES (?, ?, ?, ?)', [
        noteId,
        rank++,
        m.profileId,
        m.score,
      ]);
    }
  });
}

export async function getGuesses(db: Db, noteId: string): Promise<{ rank: number; profileId: string; score: number }[]> {
  const rows = await db.all<{ rank: number; profile_id: string; score: number }>(
    'SELECT rank, profile_id, score FROM tasting_note_guess WHERE note_id = ? ORDER BY rank',
    [noteId],
  );
  return rows.map((r) => ({ rank: r.rank, profileId: r.profile_id, score: r.score }));
}

export async function revealWine(db: Db, noteId: string, profileId: string | null, deps: Deps): Promise<void> {
  const now = deps.clock.now();
  await db.run(
    `UPDATE tasting_note SET revealed_profile_id = ?, revealed_at = CASE WHEN ? IS NULL THEN revealed_at ELSE COALESCE(revealed_at, ?) END,
     updated_at = ? WHERE id = ?`,
    [profileId, profileId, now, now, noteId],
  );
}

/**
 * Stores what the wine was and which study profile to compare the note with.
 * Pass reveal = null to undo a reveal.
 */
export async function saveReveal(db: Db, noteId: string, reveal: WineReveal | null, profileId: string | null, deps: Deps): Promise<void> {
  const now = deps.clock.now();
  const r = reveal ? cleanReveal(reveal) : null;
  const sets = REVEAL_COLUMNS.map((c) => `${c} = ?`).join(', ');
  await db.run(`UPDATE tasting_note SET revealed_at = ?, revealed_profile_id = ?, ${sets}, updated_at = ? WHERE id = ?`, [
    r ? now : null,
    r ? profileId : null,
    ...revealValues(r),
    now,
    noteId,
  ]);
}

export async function getTastingNote(db: Db, id: string): Promise<TastingNote | null> {
  const row = await db.get<NoteRow>('SELECT * FROM tasting_note WHERE id = ? AND deleted_at IS NULL', [id]);
  if (!row) return null;
  const aromas = await db.all<{ aroma_id: string; stage: 'nose' | 'palate' }>(
    'SELECT aroma_id, stage FROM tasting_note_aroma WHERE note_id = ? ORDER BY aroma_id',
    [id],
  );
  const nose = aromas.filter((a) => a.stage === 'nose').map((a) => a.aroma_id);
  const palate = aromas.filter((a) => a.stage === 'palate').map((a) => a.aroma_id);
  return {
    id: row.id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    mode: row.mode,
    wineType: row.wine_type,
    appearance: {
      clarity: row.clarity,
      intensity: row.app_intensity,
      colour: row.colour,
      observations: JSON.parse(row.observations) as Observation[],
    },
    nose: { condition: row.nose_condition, intensity: row.nose_intensity, development: row.development, aromaIds: nose },
    palate: {
      sweetness: row.sweetness,
      acidity: row.acidity,
      tannin: row.tannin,
      alcohol: row.alcohol,
      body: row.body,
      flavourIntensity: row.flavour_intensity,
      finish: row.finish,
      aromaIds: row.palate_same_as_nose ? null : palate,
    },
    conclusions: { quality: row.quality, readiness: row.readiness },
    revealedProfileId: row.revealed_profile_id,
    reveal: revealOf(row),
    labelText: row.label_text,
    photoPath: row.photo_path,
    freeNotes: row.free_notes,
  };
}

export interface NoteSummary {
  id: string;
  createdAt: string;
  wineType: WineType;
  colour: string | null;
  labelText: string | null;
  quality: number | null;
  revealedProfileId: string | null;
  reveal: WineReveal | null;
  aromaCount: number;
}

export async function listTastingNotes(db: Db, opts: { limit?: number; offset?: number } = {}): Promise<NoteSummary[]> {
  const rows = await db.all<{
    id: string;
    created_at: string;
    wine_type: WineType;
    colour: string | null;
    label_text: string | null;
    quality: number | null;
    revealed_profile_id: string | null;
    aroma_count: number;
  } & Pick<NoteRow, 'revealed_at' | 'reveal_grapes' | 'reveal_producer' | 'reveal_vintage' | 'reveal_nv' | 'reveal_country' | 'reveal_region' | 'reveal_price' | 'reveal_currency' | 'reveal_abv'>>(
    `SELECT n.id, n.created_at, n.wine_type, n.colour, n.label_text, n.quality, n.revealed_profile_id,
            n.revealed_at, n.reveal_grapes, n.reveal_producer, n.reveal_vintage, n.reveal_nv,
            n.reveal_country, n.reveal_region, n.reveal_price, n.reveal_currency, n.reveal_abv,
            (SELECT COUNT(*) FROM tasting_note_aroma a WHERE a.note_id = n.id AND a.stage = 'nose') AS aroma_count
     FROM tasting_note n
     WHERE n.deleted_at IS NULL
     ORDER BY n.created_at DESC
     LIMIT ? OFFSET ?`,
    [opts.limit ?? 50, opts.offset ?? 0],
  );
  return rows.map((r) => ({
    id: r.id,
    createdAt: r.created_at,
    wineType: r.wine_type,
    colour: r.colour,
    labelText: r.label_text,
    quality: r.quality,
    revealedProfileId: r.revealed_profile_id,
    reveal: revealOf(r as unknown as NoteRow),
    aromaCount: r.aroma_count,
  }));
}

export async function deleteTastingNote(db: Db, id: string, deps: Deps): Promise<void> {
  const now = deps.clock.now();
  await db.run('UPDATE tasting_note SET deleted_at = ?, updated_at = ? WHERE id = ?', [now, now, id]);
}
