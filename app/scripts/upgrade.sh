#!/bin/sh
# Upgrades Expo to the newest stable SDK and every other package to the versions that
# SDK expects. Run from anywhere: `npm run upgrade` inside app/.
#
# - Never uses `npm audit fix` (see README, "Dependencies").
# - Moving to Expo SDK 58 or later drops the iOS scene-lifecycle workaround from
#   app.json, because those SDKs have it built in.
# - Regenerates ios/ at the end. Then run `npx expo run:ios` to rebuild the app.
set -e
cd "$(dirname "$0")/.."

if [ -n "$(git status --porcelain -- . 2>/dev/null)" ]; then
  echo "app/ has uncommitted changes. Commit or stash them first, so the upgrade is easy to undo."
  exit 1
fi

CURRENT=$(node -p "require('./node_modules/expo/package.json').version" 2>/dev/null || echo "not installed")
LATEST=$(npm view expo dist-tags.latest)
MAJOR=${LATEST%%.*}
echo "Expo installed: $CURRENT"
echo "Expo latest stable: $LATEST (SDK $MAJOR)"
echo

# 1. Expo itself, then everything Expo knows about, aligned to that SDK.
npx expo install "expo@^$LATEST"
npx expo install --fix

# 2. Packages Expo does not manage: newest release within the current major version.
npm install "@maplibre/maplibre-react-native@^11"

# 3. SDK 58+ adopts the UIKit scene lifecycle by default; the SDK 57 switch must go.
if [ "$MAJOR" -ge 58 ]; then
  node -e '
    const fs = require("fs");
    const app = JSON.parse(fs.readFileSync("app.json", "utf8"));
    app.expo.plugins = app.expo.plugins.filter((p) => !(Array.isArray(p) && p[0] === "expo-build-properties" && p[1]?.ios?.enableSceneSupport));
    fs.writeFileSync("app.json", JSON.stringify(app, null, 2) + "\n");
    console.log("Removed ios.enableSceneSupport from app.json (built into SDK 58+).");
  '
fi

# 4. Checks. Failures are printed but do not stop the script.
echo
echo "── expo-doctor ──"
npx expo-doctor || echo "expo-doctor reported problems (above)."
echo
echo "── typecheck ──"
npx tsc --noEmit && echo "Types OK." || echo "Type errors (above). Paste them to Claude."

# 5. Fresh native project for the new versions.
echo
npx expo prebuild --clean --platform ios

echo
echo "Done: Expo $CURRENT → $(node -p "require('./node_modules/expo/package.json').version")."
echo "Next: npx expo run:ios, then go through the README first-run checklist."
echo "If it looks good: git add -A && git commit -m 'Upgrade Expo' && git push"
echo "To undo:        git checkout -- . && npm install"
