// expo-sqlite implementation of the shared Db interface (core/src/userdb/db.ts).
import * as SQLite from 'expo-sqlite';
import { Platform } from 'react-native';
import type { Db, SqlValue } from '../../../core/src/userdb/db.ts';

const web = Platform.OS === 'web';
const pause = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function open(name: string): Promise<SQLite.SQLiteDatabase> {
  const raw = await SQLite.openDatabaseAsync(name);
  // The web build stores the database in the browser (OPFS), where WAL is not available.
  await raw.execAsync(web ? 'PRAGMA foreign_keys = ON;' : 'PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;');
  return raw;
}

/**
 * In the browser only one page at a time can hold the database file (Safari reports
 * InvalidStateError otherwise). A page that is closing, or one Safari still keeps in its
 * back/forward cache, may hold it for a moment, so retry for a few seconds, and give it up
 * whenever this page is left.
 */
async function openWeb(name: string): Promise<SQLite.SQLiteDatabase> {
  let raw: SQLite.SQLiteDatabase | null = null;
  for (let attempt = 0; ; attempt++) {
    try {
      raw = await open(name);
      break;
    } catch (e) {
      if (attempt >= 7) throw e;
      await pause(250 * 2 ** Math.min(attempt, 4));
    }
  }
  const db = raw;
  window.addEventListener('pagehide', () => void db.closeAsync().catch(() => undefined));
  // Restored from the back/forward cache: the database was closed on the way out.
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) window.location.reload();
  });
  return db;
}

export async function openUserDb(name = 'user.db'): Promise<Db> {
  const raw = web ? await openWeb(name) : await open(name);
  let depth = 0;
  const params = (p?: readonly SqlValue[]) => (p ?? []) as SqlValue[];

  return {
    async exec(sql) {
      await raw.execAsync(sql);
    },
    async run(sql, p) {
      await raw.runAsync(sql, params(p));
    },
    async all<T>(sql: string, p?: readonly SqlValue[]) {
      return raw.getAllAsync<T>(sql, params(p));
    },
    async get<T>(sql: string, p?: readonly SqlValue[]) {
      return (await raw.getFirstAsync<T>(sql, params(p))) ?? null;
    },
    // Savepoints instead of withTransactionAsync so transactions can nest.
    async transaction<T>(fn: () => Promise<T>): Promise<T> {
      const name = `sp${depth++}`;
      await raw.execAsync(`SAVEPOINT ${name}`);
      try {
        const result = await fn();
        await raw.execAsync(`RELEASE ${name}`);
        return result;
      } catch (e) {
        await raw.execAsync(`ROLLBACK TO ${name}; RELEASE ${name};`);
        throw e;
      } finally {
        depth--;
      }
    },
  };
}
