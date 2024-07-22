// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-c5a1f.firebaseapp.com",
  projectId: "mern-blog-c5a1f",
  storageBucket: "mern-blog-c5a1f.appspot.com",
  messagingSenderId: "587910284306",
  appId: "1:587910284306:web:d811922e39693123b884cb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);