
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBj-5hFl8G2Zad70ceyZff8OBKm91wLhDs",
  authDomain: "house-market-1aeb3.firebaseapp.com",
  projectId: "house-market-1aeb3",
  storageBucket: "house-market-1aeb3.appspot.com",
  messagingSenderId: "760927860239",
  appId: "1:760927860239:web:f6621a1178655ba9d5557a",
  measurementId: "G-D01NEJ41PC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();