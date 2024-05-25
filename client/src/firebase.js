// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-59a51.firebaseapp.com",
  projectId: "mern-auth-59a51",
  storageBucket: "mern-auth-59a51.appspot.com",
  messagingSenderId: "328475856024",
  appId: "1:328475856024:web:6c37b7b22209fa87c514ed",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
