// src/firebase.js
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithCredential,
  GoogleAuthProvider,
  FacebookAuthProvider,
  sendPasswordResetEmail
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAvTNh-91WOWEsLVu04lRRshpJlpJ6yMb0",
  authDomain: "coachingfinder-5bd16.firebaseapp.com",
  projectId: "coachingfinder-5bd16",
  storageBucket: "coachingfinder-5bd16.appspot.com",
  messagingSenderId: "1085122910276",
  appId: "1:1085122910276:web:ce30b697dc8c454f46c411",
  measurementId: "G-10CDNXPFDF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export {
  auth,
  googleProvider,
  facebookProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithCredential,
  FacebookAuthProvider
};
