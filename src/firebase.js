// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "tomato-resto-app.firebaseapp.com",
  projectId: "tomato-resto-app",
  storageBucket: "tomato-resto-app.appspot.com",
  messagingSenderId: "1006060691306",
  appId: "1:1006060691306:web:fd1b2070c71b8764020f13",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;
