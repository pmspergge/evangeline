// Firebase initialization for Evangeline
// Si configurás un proyecto de Firebase, completá las variables en tu archivo .env.local
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDummyKeyForEvangelineLocal",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "evangeline-pasteleria.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "evangeline-pasteleria",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "evangeline-pasteleria.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdef123456"
};

// Check if valid Firebase credentials are provided
export const isFirebaseConfigured = Boolean(
  import.meta.env.VITE_FIREBASE_API_KEY && 
  import.meta.env.VITE_FIREBASE_PROJECT_ID
);

let app;
let db = null;
let auth = null;
let storageInstance = null;

try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  if (isFirebaseConfigured) {
    db = getFirestore(app);
    auth = getAuth(app);
    storageInstance = getStorage(app);
  }
} catch (e) {
  console.warn("Firebase not initialized in full mode, using client-side offline storage fallback", e);
}

export { app, db, auth, storageInstance };
