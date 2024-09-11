// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlpIHPSp4uzLJTf63VJXlEJAmLR1G-IMc",
  authDomain: "family-coins.firebaseapp.com",
  projectId: "family-coins",
  storageBucket: "family-coins.appspot.com",
  messagingSenderId: "392222873627",
  appId: "1:392222873627:web:30c0c06d9ae63b894d80be",
  measurementId: "G-TKWH47HNE4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
