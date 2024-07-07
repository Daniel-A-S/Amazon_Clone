import firebase from "firebase/compat/app";

import {getAuth} from "firebase/auth";
import "firebase/firestore";
import "firebase/auth";





// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZ_714hLUyq7l838PTgONfQC3b-gq8d5k",
  authDomain: "clone-59c6a.firebaseapp.com",
  projectId: "clone-59c6a",
  storageBucket: "clone-59c6a.appspot.com",
  messagingSenderId: "305435938288",
  appId: "1:305435938288:web:5e067c7a9ab995b04be135"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();
