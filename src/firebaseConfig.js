// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyANFP_rkQbTajt3eChtbq4AOSNhduRHVHc",
  authDomain: "smc-godda-25ec0.firebaseapp.com",
  projectId: "smc-godda-25ec0",
  storageBucket: "smc-godda-25ec0.appspot.com",
  messagingSenderId: "952429152528",
  measurementId: "G-8J2T5WBEPK",
  databaseURL: "https://smc-godda-25ec0-default-rtdb.asia-southeast1.firebasedatabase.app/",
  appId: "1:952429152528:web:1a5a41a08ebb672c3c3d95",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); // Initialize Firebase app

export const auth = getAuth(app); // Initialize and export Auth
export const storage = getStorage(app); // Initialize and export Storage
export const db = getFirestore(app); // Initialize and export Firestore
