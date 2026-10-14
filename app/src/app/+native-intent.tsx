// Screens every link that opens the app (veraison://…) before expo-router parses it.
// expo-router 57 decodes query strings with decode-uri-component 0.2.x, which can be made
// to spin on long runs of malformed %-escapes (GHSA-vcc3-ghjq-m6fr). The app has no
// real deep links yet, so anything oversized or %-heavy simply opens Today.
// Remove this guard once expo-router ships a fixed decoder (SDK 58).
const MAX_LENGTH = 512;
const MAX_ESCAPES = 24;

export function redirectSystemPath({ path }: { path: string; initial: boolean }): string {
  try {
    if (typeof path !== 'string' || path.length > MAX_LENGTH) return '/';
    const escapes = path.match(/%/g)?.length ?? 0;
    return escapes > MAX_ESCAPES ? '/' : path;
  } catch {
    return '/';
  }
}
