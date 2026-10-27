// The label photo of a tasting note. The app compresses it before it gets here (JPEG,
// a few hundred kB at most); it is stored as base64 so the same row works in SQLite on
// the phone and in the browser, and travels inside the note's sync document.

import type { Db, Deps } from './db.ts';

export interface NotePhoto {
  mime: string;
  width: number;
  height: number;
  /** Base64 without the data: prefix. */
  data: string;
  /** A small JPEG of the same photo for lists (base64), when one was made. */
  thumb?: string | null;
}

/** Upper bound for a stored photo, base64 characters (~375 kB of JPEG). Sync documents hold 1 MiB. */
export const MAX_PHOTO_BASE64 = 500_000;

/** Upper bound for a thumbnail, base64 characters (~30 kB). */
export const MAX_THUMB_BASE64 = 40_000;

export function photoUri(p: Pick<NotePhoto, 'mime' | 'data'>): string {
  return `data:${p.mime};base64,${p.data}`;
}

/** Thumbnails are always JPEG. */
export function thumbUri(thumb: string): string {
  return `data:image/jpeg;base64,${thumb}`;
}

export async function getNotePhoto(db: Db, noteId: string): Promise<NotePhoto | null> {
  return db.get<NotePhoto>('SELECT mime, width, height, data, thumb FROM tasting_note_photo WHERE note_id = ?', [noteId]);
}

/** Sets or (with null) removes the photo. The note counts as changed, so sync carries it. */
export async function setNotePhoto(db: Db, noteId: string, photo: NotePhoto | null, deps: Deps): Promise<void> {
  if (photo) {
    if (!/^image\/(jpeg|png|webp)$/.test(photo.mime)) throw new Error(`Unsupported photo type ${photo.mime}`);
    if (photo.data.length > MAX_PHOTO_BASE64) throw new Error('The photo is too large to store; it should be compressed first.');
    if (photo.thumb && photo.thumb.length > MAX_THUMB_BASE64) throw new Error('The thumbnail is too large to store.');
  }
  const now = deps.clock.now();
  await db.transaction(async () => {
    await db.run('UPDATE tasting_note SET updated_at = ? WHERE id = ?', [now, noteId]);
    if (!photo) {
      await db.run('DELETE FROM tasting_note_photo WHERE note_id = ?', [noteId]);
      return;
    }
    await db.run(
      `INSERT INTO tasting_note_photo (note_id, mime, width, height, data, thumb, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT (note_id) DO UPDATE SET mime = excluded.mime, width = excluded.width, height = excluded.height,
         data = excluded.data, thumb = excluded.thumb, updated_at = excluded.updated_at`,
      [noteId, photo.mime, Math.round(photo.width), Math.round(photo.height), photo.data, photo.thumb ?? null, now],
    );
  });
}

/**
 * Image URIs for the notes list, by note id: the thumbnail, or for photos saved before
 * thumbnails existed (or synced from such an app), the photo itself.
 */
export async function noteThumbs(db: Db): Promise<Map<string, string>> {
  const rows = await db.all<{ note_id: string; mime: string; thumb: string | null; data: string | null }>(
    'SELECT note_id, mime, thumb, CASE WHEN thumb IS NULL THEN data END AS data FROM tasting_note_photo',
  );
  const out = new Map<string, string>();
  for (const r of rows) {
    if (r.thumb) out.set(r.note_id, thumbUri(r.thumb));
    else if (r.data) out.set(r.note_id, photoUri({ mime: r.mime, data: r.data }));
  }
  return out;
}
