import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCCAEfKa0NqX7VT0s7tdRIyyh4WXMxO-e4",
  authDomain: "itlang4u.firebaseapp.com",
  projectId: "itlang4u",
  storageBucket: "itlang4u.appspot.com",
  messagingSenderId: "635595891715",
  appId: "1:635595891715:web:e96db688643f67ce539a36",
  measurementId: "G-ES8XE5YCHH"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export { auth, db }