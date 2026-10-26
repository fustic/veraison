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
}

/** Upper bound for a stored photo, base64 characters (~375 kB of JPEG). Sync documents hold 1 MiB. */
export const MAX_PHOTO_BASE64 = 500_000;

export function photoUri(p: Pick<NotePhoto, 'mime' | 'data'>): string {
  return `data:${p.mime};base64,${p.data}`;
}

export async function getNotePhoto(db: Db, noteId: string): Promise<NotePhoto | null> {
  return db.get<NotePhoto>('SELECT mime, width, height, data FROM tasting_note_photo WHERE note_id = ?', [noteId]);
}

/** Sets or (with null) removes the photo. The note counts as changed, so sync carries it. */
export async function setNotePhoto(db: Db, noteId: string, photo: NotePhoto | null, deps: Deps): Promise<void> {
  if (photo) {
    if (!/^image\/(jpeg|png|webp)$/.test(photo.mime)) throw new Error(`Unsupported photo type ${photo.mime}`);
    if (photo.data.length > MAX_PHOTO_BASE64) throw new Error('The photo is too large to store; it should be compressed first.');
  }
  const now = deps.clock.now();
  await db.transaction(async () => {
    await db.run('UPDATE tasting_note SET updated_at = ? WHERE id = ?', [now, noteId]);
    if (!photo) {
      await db.run('DELETE FROM tasting_note_photo WHERE note_id = ?', [noteId]);
      return;
    }
    await db.run(
      `INSERT INTO tasting_note_photo (note_id, mime, width, height, data, updated_at) VALUES (?, ?, ?, ?, ?, ?)
       ON CONFLICT (note_id) DO UPDATE SET mime = excluded.mime, width = excluded.width, height = excluded.height,
         data = excluded.data, updated_at = excluded.updated_at`,
      [noteId, photo.mime, Math.round(photo.width), Math.round(photo.height), photo.data, now],
    );
  });
}

/** Note ids that have a photo, for list thumbnails or markers. */
export async function notesWithPhotos(db: Db): Promise<Set<string>> {
  return new Set((await db.all<{ note_id: string }>('SELECT note_id FROM tasting_note_photo')).map((r) => r.note_id));
}
