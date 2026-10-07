# Veraison

An offline-first study companion for the WSET® Level 3 Award in Wines: grape profiles
with look-alikes, a study map, and one-screen SAT tasting notes that suggest what the
wine might be and track your tasting bias.

Private project: notes and progress never leave the phone. Not affiliated with or
endorsed by the Wine & Spirit Education Trust.

## Layout

```
app/       Expo (React Native) app — expo-router screens in app/src/app
core/      shared TypeScript with no dependencies: SAT scales, content types,
           wine-profile scorer, quality coach, user database (notes, progress, backup)
content/   the study content, as typed TypeScript files you edit and check against your book
tools/     build-content.ts: validates /content and writes app/src/generated/*
```

`core`, `content` and `tools` run directly on Node 22.18+ (built-in TypeScript stripping
and `node:sqlite`), so they need no `npm install`.

## Data

- **Content** (grapes, regions, aromas, wine profiles) is compiled into
  `app/src/generated/content.json` and bundled with the app. It is read-only and replaced
  on each app update.
- **Your data** lives in `user.db` (SQLite) on the phone: tasting notes and their aromas,
  the suggestions shown at the time, what you revealed the wine to be, and a
  `content_status` row for every grape or region you have opened (seen / studied /
  mastered, checked against the book, been there). Anything without a row is unseen.
  Content is referenced by stable text ids like `grape:pinot-noir`, so content updates
  never break your notes. Every table has UUIDs and `updated_at`, ready for a sync
  backend later. `core/src/userdb/backup.ts` exports and imports everything as JSON.

## Everyday commands

```sh
npm test                 # core + content tests (node:test)
npm run content:check    # validate /content
npm run content:build    # validate and regenerate app/src/generated
npm run typecheck        # needs `npm install` at the repo root once
```

## Running the app

The app uses native modules (SQLite, MapLibre), so it needs a development build,
not Expo Go.

```sh
cd app
npm run setup            # installs SDK-matched versions via `npx expo install`
npx expo run:ios         # or: npx expo run:android  (Xcode / Android Studio required)
```

### First-run checklist (milestone 1: the map test)

1. The app opens on **Today** without the "Could not open your notes database" screen.
2. **Map** tab: Bordeaux and Burgundy appear as circles on a plain background with
   **airplane mode on**. That is the offline test. The circles are placeholders.
3. Tap Pauillac: the sheet opens, and Pauillac turns pink (seen). Go back to Today: the
   regions count went up.
4. Toggle **Online basemap**: streets appear under the circles.
5. **Taste** → New tasting note → save → the suggestion screen shows a top 3. Reveal the
   wine and check the comparison.
6. Kill and reopen the app: the note and the seen regions are still there.

If step 2 fails on a real device, try Flutter for the map before building anything else.

## Content workflow

1. Open the files for the chapter you are studying in `/content`.
2. Check every fact against your course book and fix what differs.
3. Set `verified: true` on the entries you have checked.
4. `npm run content:build`, then reload the app.

Content is written in our own words. Never paste text, tables or images from the WSET
study materials into this repo.

## Distribution

Private for now: TestFlight (internal testers) and Google Play internal testing.
