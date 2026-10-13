#!/bin/sh
# Installs every app dependency at the versions that match the installed Expo SDK.
# `npx expo install` picks SDK-compatible versions, so nothing here is pinned by hand.
set -e
cd "$(dirname "$0")/.."

npm install
npx expo install \
  react react-native react-dom \
  expo-router expo-linking expo-constants expo-status-bar expo-dev-client \
  react-native-safe-area-context react-native-screens react-native-gesture-handler \
  expo-sqlite expo-crypto expo-build-properties \
  react-native-svg \
  @maplibre/maplibre-react-native
npx expo install --dev @types/react
npx expo install --fix

echo
echo "Done. Next: npx expo run:ios   (or: npx expo run:android)"
