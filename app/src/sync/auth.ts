// Sign-in on iOS and Android: the native Google sheet gives an ID token, which signs in
// to Firebase. The Firebase session is kept in AsyncStorage across launches.
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin, isErrorWithCode, isSuccessResponse, statusCodes } from '@react-native-google-signin/google-signin';
import * as FirebaseAuth from 'firebase/auth';
import { getAuth, GoogleAuthProvider, initializeAuth, signInWithCredential, signOut as firebaseSignOut, type Auth, type Persistence } from 'firebase/auth';
import { GOOGLE_IOS_CLIENT_ID, GOOGLE_WEB_CLIENT_ID } from './config';
import { firebaseApp } from './firebaseApp';

// Exported only from Firebase's React Native build, which Metro picks; the types are the web ones.
const getReactNativePersistence = (FirebaseAuth as unknown as { getReactNativePersistence(s: typeof AsyncStorage): Persistence }).getReactNativePersistence;

function makeAuth(): Auth {
  try {
    return initializeAuth(firebaseApp, { persistence: getReactNativePersistence(AsyncStorage) });
  } catch {
    // Already initialised (fast refresh in development).
    return getAuth(firebaseApp);
  }
}

export const auth = makeAuth();

let configured = false;

/** Opens Google sign-in. Resolves false if the person backs out. */
export async function signInWithGoogle(): Promise<boolean> {
  if (!GOOGLE_WEB_CLIENT_ID) throw new Error('Google sign-in on this device is not set up yet (web client ID missing in app/src/sync/config.ts).');
  if (!configured) {
    GoogleSignin.configure({ webClientId: GOOGLE_WEB_CLIENT_ID, iosClientId: GOOGLE_IOS_CLIENT_ID });
    configured = true;
  }
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const res = await GoogleSignin.signIn();
    if (!isSuccessResponse(res)) return false;
    const idToken = res.data.idToken;
    if (!idToken) throw new Error('Google did not return an ID token.');
    await signInWithCredential(auth, GoogleAuthProvider.credential(idToken));
    return true;
  } catch (e) {
    if (isErrorWithCode(e) && (e.code === statusCodes.SIGN_IN_CANCELLED || e.code === statusCodes.IN_PROGRESS)) return false;
    throw e;
  }
}

export async function signOut(): Promise<void> {
  await firebaseSignOut(auth);
  if (configured) await GoogleSignin.signOut().catch(() => undefined);
}
