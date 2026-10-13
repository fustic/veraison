// Schema for user.db. Append new migrations to the end; never edit a shipped one.
// Every user table has text UUIDs and updated_at so a sync backend can be added later.

import type { Db } from './db.ts';

export const MIGRATIONS: readonly string[] = [
  /* 1 */ `
  CREATE TABLE tasting_note (
    id TEXT PRIMARY KEY,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    deleted_at TEXT,
    mode TEXT NOT NULL CHECK (mode IN ('practice', 'exam')),
    wine_type TEXT NOT NULL CHECK (wine_type IN ('white', 'rose', 'red')),
    clarity INTEGER,
    app_intensity INTEGER,
    colour TEXT,
    observations TEXT NOT NULL DEFAULT '[]',
    nose_condition INTEGER,
    nose_intensity INTEGER,
    development INTEGER,
    sweetness INTEGER,
    acidity INTEGER,
    tannin INTEGER,
    alcohol INTEGER,
    body INTEGER,
    flavour_intensity INTEGER,
    finish INTEGER,
    palate_same_as_nose INTEGER NOT NULL DEFAULT 1,
    quality INTEGER,
    readiness INTEGER,
    revealed_profile_id TEXT,
    label_text TEXT,
    photo_path TEXT,
    free_notes TEXT
  );
  CREATE INDEX tasting_note_created ON tasting_note (created_at) WHERE deleted_at IS NULL;

  CREATE TABLE tasting_note_aroma (
    note_id TEXT NOT NULL REFERENCES tasting_note (id) ON DELETE CASCADE,
    aroma_id TEXT NOT NULL,
    stage TEXT NOT NULL CHECK (stage IN ('nose', 'palate')),
    PRIMARY KEY (note_id, aroma_id, stage)
  );

  CREATE TABLE tasting_note_guess (
    note_id TEXT NOT NULL REFERENCES tasting_note (id) ON DELETE CASCADE,
    rank INTEGER NOT NULL,
    profile_id TEXT NOT NULL,
    score REAL NOT NULL,
    PRIMARY KEY (note_id, rank)
  );

  CREATE TABLE content_status (
    content_id TEXT PRIMARY KEY,
    first_seen_at TEXT,
    last_seen_at TEXT,
    view_count INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'seen' CHECK (status IN ('seen', 'studied', 'mastered')),
    checked_against_book INTEGER NOT NULL DEFAULT 0,
    been_there INTEGER NOT NULL DEFAULT 0,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE review_card (
    card_id TEXT PRIMARY KEY,
    due TEXT NOT NULL,
    stability REAL,
    difficulty REAL,
    reps INTEGER NOT NULL DEFAULT 0,
    lapses INTEGER NOT NULL DEFAULT 0,
    state TEXT NOT NULL DEFAULT 'new',
    updated_at TEXT NOT NULL
  );

  CREATE TABLE setting (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );
  `,
  /* 2: what the wine was, typed in at the reveal */ `
  ALTER TABLE tasting_note ADD COLUMN revealed_at TEXT;
  ALTER TABLE tasting_note ADD COLUMN reveal_grapes TEXT NOT NULL DEFAULT '[]';
  ALTER TABLE tasting_note ADD COLUMN reveal_producer TEXT;
  ALTER TABLE tasting_note ADD COLUMN reveal_vintage INTEGER;
  ALTER TABLE tasting_note ADD COLUMN reveal_nv INTEGER NOT NULL DEFAULT 0;
  ALTER TABLE tasting_note ADD COLUMN reveal_country TEXT;
  ALTER TABLE tasting_note ADD COLUMN reveal_region TEXT;
  ALTER TABLE tasting_note ADD COLUMN reveal_price REAL;
  ALTER TABLE tasting_note ADD COLUMN reveal_currency TEXT;
  -- Notes revealed before this migration only had a profile; keep them revealed.
  UPDATE tasting_note SET revealed_at = updated_at WHERE revealed_profile_id IS NOT NULL;
  `,
  /* 3: alcohol from the label */ `
  ALTER TABLE tasting_note ADD COLUMN reveal_abv REAL;
  `,
];

export async function migrate(db: Db): Promise<{ from: number; to: number }> {
  await db.exec('PRAGMA foreign_keys = ON;');
  const row = await db.get<{ user_version: number }>('PRAGMA user_version;');
  const from = row?.user_version ?? 0;
  for (let v = from; v < MIGRATIONS.length; v++) {
    const sql = MIGRATIONS[v];
    if (sql === undefined) break;
    await db.transaction(async () => {
      await db.exec(sql);
      // PRAGMA cannot take bound parameters; v is a trusted integer.
      await db.exec(`PRAGMA user_version = ${v + 1};`);
    });
  }
  return { from, to: MIGRATIONS.length };
}
