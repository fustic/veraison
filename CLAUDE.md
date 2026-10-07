# Notes for Claude working in this repo

- Monorepo without workspaces: `core/`, `content/`, `tools/` are dependency-free TypeScript
  run directly by Node 22.18+ (type stripping). Use explicit `.ts` extensions in imports there
  and only erasable TypeScript (no enums, no namespaces, no parameter properties).
- `app/` is an Expo app (expo-router, files in `app/src/app`). It imports core via relative
  paths (`../../../core/src/...ts`) and content via `app/src/generated/*.json`.
- Never hand-edit `app/src/generated/`; run `npm run content:build`.
- User data: `core/src/userdb/`. Add schema changes as a new entry at the end of
  `MIGRATIONS`; never edit a shipped migration. Keep the `Db` interface the only SQL
  boundary so tests can run on `node:sqlite` (`core/test/nodeDb.ts`).
- Before committing: `npm test` and `npm run content:check` must pass.
- Content must be written in our own words, never copied from WSET materials. New entries
  start with `verified: false`.
- IDs are stable strings: `grape:`, `region:<iso2>-...`, `aroma:`, `profile:`. Renaming one
  orphans user data that references it.
