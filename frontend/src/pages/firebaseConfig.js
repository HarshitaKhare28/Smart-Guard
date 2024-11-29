// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

export const firebaseConfig = {
  apiKey: "AIzaSyCTaZbS-O22qAdOsj21aaDNW87M5t_JDb8",
  authDomain: "live-location-tracking-ab4c4.firebaseapp.com",
  databaseURL: "https://live-location-tracking-ab4c4-default-rtdb.firebaseio.com",
  projectId: "live-location-tracking-ab4c4",
  storageBucket: "live-location-tracking-ab4c4.appspot.com",
  messagingSenderId: "765320667689",
  appId: "1:765320667689:web:6771970afc3e1157a73238",
  measurementId: "G-LSVHWXB5NC",
};

// Initialize Firebase once
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
