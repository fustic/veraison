// Tasting notes: save, read, list, delete. Notes are soft-deleted so a future
// sync can propagate deletions.

import type { ProfileMatch } from '../scorer.ts';
import type { Observation, TastingNote, TastingNoteInput, WineType } from '../sat.ts';
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
}

const COLUMNS = [
  'id', 'created_at', 'updated_at', 'mode', 'wine_type',
  'clarity', 'app_intensity', 'colour', 'observations',
  'nose_condition', 'nose_intensity', 'development',
  'sweetness', 'acidity', 'tannin', 'alcohol', 'body', 'flavour_intensity', 'finish',
  'palate_same_as_nose', 'quality', 'readiness',
  'revealed_profile_id', 'label_text', 'photo_path', 'free_notes',
] as const;

function toRow(id: string, createdAt: string, updatedAt: string, n: TastingNoteInput): SqlValue[] {
  return [
    id, createdAt, updatedAt, n.mode, n.wineType,
    n.appearance.clarity, n.appearance.intensity, n.appearance.colour, JSON.stringify(n.appearance.observations),
    n.nose.condition, n.nose.intensity, n.nose.development,
    n.palate.sweetness, n.palate.acidity, n.palate.tannin, n.palate.alcohol, n.palate.body,
    n.palate.flavourIntensity, n.palate.finish,
    n.palate.aromaIds === null ? 1 : 0, n.conclusions.quality, n.conclusions.readiness,
    n.revealedProfileId, n.labelText, n.photoPath, n.freeNotes,
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

/** Stores the "what is this?" suggestions shown when the note was finished. */
export async function saveGuesses(db: Db, noteId: string, matches: readonly ProfileMatch[]): Promise<void> {
  await db.transaction(async () => {
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
  await db.run('UPDATE tasting_note SET revealed_profile_id = ?, updated_at = ? WHERE id = ?', [profileId, deps.clock.now(), noteId]);
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
  }>(
    `SELECT n.id, n.created_at, n.wine_type, n.colour, n.label_text, n.quality, n.revealed_profile_id,
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
    aromaCount: r.aroma_count,
  }));
}

export async function deleteTastingNote(db: Db, id: string, deps: Deps): Promise<void> {
  const now = deps.clock.now();
  await db.run('UPDATE tasting_note SET deleted_at = ?, updated_at = ? WHERE id = ?', [now, now, id]);
}
