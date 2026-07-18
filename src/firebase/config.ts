import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBZ9z8arGmNCVtkFDScCrw-dQARh4BJ0vs",
  authDomain: "futurecodeai-f7dab.firebaseapp.com",
  projectId: "futurecodeai-f7dab",
  storageBucket: "futurecodeai-f7dab.firebasestorage.app",
  messagingSenderId: "382376776948",
  appId: "1:382376776948:web:af1e5c953e0a6a32283aa1",
  measurementId: "G-TTF9XXE48T"
};

const app = initializeApp(firebaseConfig);
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
