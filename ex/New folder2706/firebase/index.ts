// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4Qgs2ZLJEC0Gwghsojt0XDgur7HYvNek",
  authDomain: "ims-app-6b6cf.firebaseapp.com",
  projectId: "ims-app-6b6cf",
  storageBucket: "ims-app-6b6cf.appspot.com",
  messagingSenderId: "738020007417",
  appId: "1:738020007417:web:f559dfb5dc5f0aa0867128",
  measurementId: "G-6VYRJX4R3X"
};



// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
