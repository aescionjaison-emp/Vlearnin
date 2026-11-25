import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCNOY96vPc1Lw0WbuS-0xeoI7iBCD8ycPI",
  authDomain: "vlearnin.firebaseapp.com",
  projectId: "vlearnin",
  storageBucket: "vlearnin.firebasestorage.app",
  messagingSenderId: "567490310424",
  appId: "1:567490310424:web:6102fe204c798f291d6e6d",
  measurementId: "G-DHNH75376T",
};

export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

let analyticsPromise: Promise<Analytics | null> | null = null;

export function initFirebaseAnalytics(): Promise<Analytics | null> {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (!analyticsPromise) {
    analyticsPromise = isSupported()
      .then((supported) => (supported ? getAnalytics(firebaseApp) : null))
      .catch(() => null);
  }
  return analyticsPromise;
}
