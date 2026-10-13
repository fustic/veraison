// Small key/value preferences stored in user.db (for example the last currency used).

import type { Db } from './db.ts';

export async function getSetting(db: Db, key: string): Promise<string | null> {
  const row = await db.get<{ value: string }>('SELECT value FROM setting WHERE key = ?', [key]);
  return row?.value ?? null;
}

export async function setSetting(db: Db, key: string, value: string): Promise<void> {
  await db.run('INSERT INTO setting (key, value) VALUES (?, ?) ON CONFLICT (key) DO UPDATE SET value = excluded.value', [key, value]);
}
