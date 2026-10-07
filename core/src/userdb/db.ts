// A tiny async database interface. The app implements it with expo-sqlite,
// the tests with node:sqlite, so all SQL in this folder runs in both.

export type SqlValue = string | number | null;

export interface Db {
  exec(sql: string): Promise<void>;
  run(sql: string, params?: readonly SqlValue[]): Promise<void>;
  all<T>(sql: string, params?: readonly SqlValue[]): Promise<T[]>;
  get<T>(sql: string, params?: readonly SqlValue[]): Promise<T | null>;
  transaction<T>(fn: () => Promise<T>): Promise<T>;
}

export interface Clock {
  now(): string; // ISO-8601
}

export interface Deps {
  clock: Clock;
  newId(): string;
}

export const systemClock: Clock = { now: () => new Date().toISOString() };
