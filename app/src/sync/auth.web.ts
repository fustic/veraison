// Sign-in on the web. The app page is cross-origin isolated (COOP/COEP, needed for SQLite
// in the browser), which breaks Google's sign-in popup and scripts. So sign-in happens on
// /signin.html, a plain page on the same site without those headers; Firebase keeps the
// session in IndexedDB for the site, and this page picks it up when the person comes back.
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

/** Leaves for the sign-in page, which brings the person back here afterwards. */
export async function signInWithGoogle(): Promise<boolean> {
  const back = window.location.pathname + window.location.search;
  // Firebase Hosting serves it at /signin (cleanUrls); the dev server only knows the file name.
  const page = window.location.hostname === 'localhost' ? '/signin.html' : '/signin';
  window.location.assign(`${page}?return=${encodeURIComponent(back)}`);
  return false;
}

export async function signOut(): Promise<void> {
  await firebaseSignOut(auth);
}
