// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-c82fd.firebaseapp.com",
  projectId: "mern-blog-c82fd",
  storageBucket: "mern-blog-c82fd.appspot.com",
  messagingSenderId: "143669748117",
  appId: "1:143669748117:web:ec20ed1f298df74537d69c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);