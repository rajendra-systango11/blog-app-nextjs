import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPYaNF_Uq2rKMgXfw6lzMb4kwqakOp0eQ",
  authDomain: "blog-nextjs-a1115.firebaseapp.com",
  projectId: "blog-nextjs-a1115",
  storageBucket: "blog-nextjs-a1115.firebasestorage.app",
  messagingSenderId: "242392310961",
  appId: "1:242392310961:web:8c6dbedba0e21a67c9ae90"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const storage = getStorage(app);

const db = getFirestore(app);

export { db };