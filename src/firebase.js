// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDrI5Qv8p6S6zkmYN9F10wPabj8Wbxn1ws",
    authDomain: "contact-list-3e610.firebaseapp.com",
    projectId: "contact-list-3e610",
    storageBucket: "contact-list-3e610.appspot.com",
    messagingSenderId: "951798450218",
    appId: "1:951798450218:web:8a9f37f9730aaab03cdb53",
    measurementId: "G-F3WFC8FKK2"
  };
  
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
