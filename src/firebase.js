// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBaHfDy7a0DQi47nS_8D-Z8PO67mOAabK0",
  authDomain: "linkedin-clone-51d34.firebaseapp.com",
  projectId: "linkedin-clone-51d34",
  storageBucket: "linkedin-clone-51d34.appspot.com",
  messagingSenderId: "723042030169",
  appId: "1:723042030169:web:3f9e84ef25e496e2409748",
  measurementId: "G-D9CY786JJQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider, doc, setDoc };