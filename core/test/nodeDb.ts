// node:sqlite implementation of the Db interface, for tests and build tools.
import { DatabaseSync } from 'node:sqlite';
import type { Db, Deps, SqlValue } from '../src/userdb/db.ts';

export function openNodeDb(path = ':memory:'): Db & { close(): void } {
  const raw = new DatabaseSync(path);
  let depth = 0;
  const bind = (params?: readonly SqlValue[]) => (params ?? []) as SqlValue[];
  return {
    async exec(sql) {
      raw.exec(sql);
    },
    async run(sql, params) {
      raw.prepare(sql).run(...bind(params));
    },
    async all<T>(sql: string, params?: readonly SqlValue[]) {
      return raw.prepare(sql).all(...bind(params)).map((r) => ({ ...r })) as T[];
    },
    async get<T>(sql: string, params?: readonly SqlValue[]) {
      const row = raw.prepare(sql).get(...bind(params));
      return row ? ({ ...row } as T) : null;
    },
    async transaction<T>(fn: () => Promise<T>): Promise<T> {
      const name = `sp${depth++}`;
      raw.exec(`SAVEPOINT ${name}`);
      try {
        const result = await fn();
        raw.exec(`RELEASE ${name}`);
        return result;
      } catch (e) {
        raw.exec(`ROLLBACK TO ${name}`);
        raw.exec(`RELEASE ${name}`);
        throw e;
      } finally {
        depth--;
      }
    },
    close() {
      raw.close();
    },
  };
}

/** Deterministic clock and ids for tests. */
export function testDeps(start = Date.UTC(2026, 9, 7, 12, 0, 0)): Deps & { tick(ms?: number): void } {
  let t = start;
  let n = 0;
  return {
    clock: { now: () => new Date(t).toISOString() },
    newId: () => `id-${++n}`,
    tick(ms = 1000) {
      t += ms;
    },
  };
}
