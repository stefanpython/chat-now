// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRNEBQsDpHRFmztS5-NsF7dI9xNSlcsyU",
  authDomain: "chatnow-668cb.firebaseapp.com",
  projectId: "chatnow-668cb",
  storageBucket: "chatnow-668cb.appspot.com",
  messagingSenderId: "1013009609852",
  appId: "1:1013009609852:web:5aa1a68accef0c53cb05f9",
  measurementId: "G-F4ZT3XLFZ8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
