// expo-sqlite implementation of the shared Db interface (core/src/userdb/db.ts).
import * as SQLite from 'expo-sqlite';
import { Platform } from 'react-native';
import type { Db, SqlValue } from '../../../core/src/userdb/db.ts';

export async function openUserDb(name = 'user.db'): Promise<Db> {
  const raw = await SQLite.openDatabaseAsync(name);
  // The web build stores the database in the browser (OPFS), where WAL is not available.
  await raw.execAsync(Platform.OS === 'web' ? 'PRAGMA foreign_keys = ON;' : 'PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;');
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
