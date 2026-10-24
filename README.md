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
npm run map:countries -- ne_50m_admin_0_countries.geojson   # rebuild the bundled country outlines
```

## Running the app

The app uses native modules (SQLite, MapLibre), so it needs a development build,
not Expo Go.

```sh
cd app
npm run setup            # installs SDK-matched versions via `npx expo install`
npx expo run:ios         # or: npx expo run:android  (Xcode / Android Studio required)
```

After changing `app.json` or native dependencies, regenerate the native project:
`npx expo prebuild --clean --platform ios`, then `npx expo run:ios`.

Xcode 27 requires the UIKit scene lifecycle; without it the app crashes at launch in
`_UIApplicationEvaluateRuntimeIssueForNoSceneLifecycleAdoption`. On Expo SDK 57 this is
switched on by `ios.enableSceneSupport` in the `expo-build-properties` plugin (needs
expo ≥ 57.0.23). Remove that option when moving to SDK 58, which has it built in.

### Web

The same app also builds for the browser. The map screen draws with MapLibre GL JS there
(`app/src/map/WineMap.web.tsx`; the native map is `WineMap.tsx`, both share `layers.ts`), and
your progress is stored in the browser by expo-sqlite's WebAssembly build.

```sh
cd app
npm run web              # dev server at http://localhost:8081
npm run build:web        # static site in app/dist
```

SQLite in the browser needs a cross-origin isolated page, so the host must send
`Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Embedder-Policy: require-corp`.
The dev server does this (`metro.config.js`), `public/_headers` does it on Netlify and
Cloudflare Pages, and the `expo-router` plugin in `app.json` does it on EAS Hosting.
GitHub Pages cannot set headers, so it will not work there. Deploy `app/dist` with one of:

- EAS Hosting: `npx eas-cli deploy --prod`
- Netlify: drag `app/dist` onto app.netlify.com/drop, or `npx netlify-cli deploy --dir dist --prod`
- Cloudflare Pages: `npx wrangler pages deploy dist`

On an iPhone, open the site in Safari and use Share › Add to Home Screen. Progress lives in
that browser only; it does not sync with the native app. Only one tab can hold the database
at a time.

### First-run checklist (milestone 1: the map test)

1. The app opens on **Today** without the "Could not open your notes database" screen.
2. **Map** tab, with **airplane mode on**: the world map shows country outlines on blue sea
   (the offline test). Tap Europe › France › Bordeaux: the camera flies in and the sheet
   changes at each level. Region circles are placeholders.
3. Tap Pauillac: the sheet shows it and it turns pink (seen). Go back to Today: the regions
   count went up.
4. The street map is on by default; with no connection the map switches to the offline
   outlines by itself. The layers button (third on the right) turns streets on and off.
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

## Dependencies and `npm audit`

Upgrade the app's packages with Expo's tools, never with `npm audit fix`:

```sh
cd app
npm run upgrade          # newest stable Expo SDK + matching packages, checks, fresh ios/
npx expo install --fix   # or: just realign packages to the installed SDK
npx expo-doctor          # check the project for version mismatches
```

`npm run upgrade` (`app/scripts/upgrade.sh`) asks npm for Expo's latest stable release,
installs it, aligns every Expo-managed package, updates MapLibre within v11, drops the
SDK 57 scene-lifecycle switch when moving to SDK 58+, runs expo-doctor and the
typecheck, and regenerates `ios/`. Run it on a clean working tree so it is easy to undo.

`npm audit fix` resolves advisories without knowing which versions the Expo SDK needs.
On SDK 57 it downgrades react-native-reanimated and react-native-worklets and drops
React Native's Metro packages, and `--force` replaces Expo with SDK 44. Neither fixes
the advisories below.

Known advisories on SDK 57 (checked October 2026):

| Package | Severity | Where it runs | Status |
| --- | --- | --- | --- |
| braces (via Metro, micromatch) | high | build tooling on your Mac | No patched release exists yet |
| node-forge (via @expo/code-signing-certificates) | high | Expo CLI, signing of EAS updates (not used) | No patched release exists yet |
| uuid < 11.1.1 (via xcode) | moderate | `expo prebuild` editing the Xcode project | Only affects calls that pass a buffer; not reachable here |
| decode-uri-component (via query-string in expo-router) | moderate | in the app, when parsing link URLs | Fixed in expo-router 58. Until then `app/src/app/+native-intent.tsx` rejects oversized links |

None of the build-tool advisories reach the phone. Recheck when moving to Expo SDK 58.

## Assets and data sources

- **Fonts** (`app/assets/fonts`): IBM Plex Sans and IBM Plex Mono (SIL Open Font License),
  Bricolage Grotesque (SIL Open Font License). Licences sit next to the files. Plex Sans and
  Bricolage are static instances cut from the variable fonts so each weight is its own file.
  `app/src/Text.tsx` maps `fontWeight` to the right file, so use it instead of React Native's `Text`.
- **Country outlines** (`app/src/generated/countries.geojson.json`): Natural Earth 1:50m
  admin-0 countries (public domain), simplified to about 4 km by `tools/build-countries.ts`.
  They make the world and Europe map levels work offline.
- **Appellation outlines** (`content/boundaries/regions.json`): Candiago et al. 2022, EU wine
  PDO inventory, simplified by `tools/build-boundaries.ts`. See `tools/boundaries/README.md`.
- **US AVA outlines** (`content/boundaries/us.json`): UC Davis Library AVA Digitizing Project (CC0),
  simplified by `tools/build-ava-boundaries.ts` (`npm run map:us`).
- **Australia, New Zealand, Chile, Argentina, South Africa** (`content/boundaries/world.json`):
  © Wine Australia GIs (CC BY 4.0), IPONZ GI register, geoBoundaries (CC BY 3.0 IGO); South Africa is
  approximate. `npm run map:world`; see `tools/boundaries/README.md`.

## Distribution

Private for now: TestFlight (internal testers) and Google Play internal testing, plus the web
build (see Running the app › Web).
