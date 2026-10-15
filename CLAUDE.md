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
  start with `verified: false`. Study notes the user shares go into `content/topics/` (theory)
  and the matching `content/grapes/` / `content/regions/` files (facts), condensed and reworded.
- Regions live in `content/regions/` (`france.ts`, `europe.ts`, `new-world.ts`, built with the `r()`
  helper in `r.ts`); grapes one per file in `content/grapes/`; topics in `content/topics/`. Register new
  files or arrays in `content/index.ts` (topic order there is the Study tab order).
- Map outlines: `npm run map:boundaries` (EU PDOs, by name; exceptions in `eu-pdo-regions.ts`),
  `npm run map:us` (AVAs, `us-ava-regions.ts`), `npm run map:world` (AU, NZ, CL, AR, ZA,
  `world-regions.ts`), then `npm run content:build`. Source data lives in the gitignored
  `tools/boundaries/source/`.
- IDs are stable strings: `grape:`, `region:<iso2>-...` (a country is `region:<iso2>`), `aroma:`,
  `profile:`, `topic:`. Renaming one
  orphans user data that references it.
- In `app/`, import `Text` and `TextInput` from `app/src/Text.tsx`, not from `react-native`:
  it maps `fontWeight` to the bundled IBM Plex files. Headings use `fonts.display`, small caps
  labels `fonts.mono` (see `app/src/theme.ts`).
- Route files in `app/src/app` export only their default component; shared helpers go in
  `app/src/names.ts`, `app/src/components.tsx` or `core/`. Exception: expo-router's special
  `+native-intent.tsx`, which exports `redirectSystemPath`.
- Never run `npm audit fix` in `app/`; use `npx expo install --fix`. See README "Dependencies".
