// In firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCq48Q-oOquStODW5KFeSwVE192raa-1wo",
  authDomain: "invincible-a1a03.firebaseapp.com",
  projectId: "invincible-a1a03",
  storageBucket: "invincible-a1a03.appspot.com",
  messagingSenderId: "822123853355",
  appId: "1:822123853355:web:f2001a2486818c22fbdc6e",
  measurementId: "G-TJ2HG0EZZL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default getFirestore(app);
