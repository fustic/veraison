// Firebase project settings. None of these are secrets: they identify the project, and
// the Firestore rules (app/firestore.rules) decide who may read or write what.
export const firebaseConfig = {
  apiKey: 'AIzaSyABlzywb8zOu2rEib6GwBRZL7eumOZ48f8',
  authDomain: 'veraison-353ad.firebaseapp.com',
  projectId: 'veraison-353ad',
  storageBucket: 'veraison-353ad.firebasestorage.app',
  messagingSenderId: '463285819168',
  appId: '1:463285819168:web:cf57233735e599e3dd2945',
};

/** iOS OAuth client, from GoogleService-Info.plist (its reversed form is the URL scheme in app.json). */
export const GOOGLE_IOS_CLIENT_ID = '463285819168-qsvsuaen7b2edacpemmn8p3vmf2s4v0i.apps.googleusercontent.com';

/**
 * The project's web OAuth client (Firebase console › Authentication › Sign-in method ›
 * Google › Web SDK configuration). Native Google sign-in needs it to get a token Firebase
 * accepts. Empty until filled in.
 */
export const GOOGLE_WEB_CLIENT_ID = '';
