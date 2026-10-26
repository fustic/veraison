// The Firebase app and the Firestore Lite client (plain HTTPS requests, no streaming:
// sync only needs one-off reads and writes, and Lite works the same on web and native).
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { firebaseConfig } from './config';

export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const cloud = getFirestore(firebaseApp);
