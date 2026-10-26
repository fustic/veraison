// Sign-in on the web. The app page is cross-origin isolated (COOP/COEP, needed for SQLite
// in the browser), which breaks Google's sign-in popup and scripts. So sign-in happens on
// /signin.html, a plain page on the same site without those headers, opened in its own tab;
// Firebase keeps the session in IndexedDB for the site, where this page picks it up.
// This auth instance has no popup or redirect support, so it loads nothing from Google.
import { browserLocalPersistence, getAuth, indexedDBLocalPersistence, initializeAuth, signOut as firebaseSignOut, type Auth } from 'firebase/auth';
import { firebaseApp } from './firebaseApp';

function makeAuth(): Auth {
  try {
    return initializeAuth(firebaseApp, { persistence: [indexedDBLocalPersistence, browserLocalPersistence] });
  } catch {
    return getAuth(firebaseApp);
  }
}

export const auth = makeAuth();

/**
 * Opens the sign-in page in its own tab, so this page (and the database it holds) stays as
 * it is. Firebase notices the new session here on its own (it checks IndexedDB for changes
 * from other tabs). If the browser blocks the tab, go to the sign-in page in this one.
 */
export async function signInWithGoogle(): Promise<boolean> {
  // Firebase Hosting serves it at /signin (cleanUrls); the dev server only knows the file name.
  const page = window.location.hostname === 'localhost' ? '/signin.html' : '/signin';
  const tab = window.open(`${page}?tab=1`, 'veraison-signin');
  if (!tab) {
    const back = window.location.pathname + window.location.search;
    window.location.assign(`${page}?return=${encodeURIComponent(back)}`);
  }
  return false;
}

export async function signOut(): Promise<void> {
  await firebaseSignOut(auth);
}
