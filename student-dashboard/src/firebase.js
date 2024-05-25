// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "studentrecord-59d51.firebaseapp.com",
  databaseURL: "https://studentrecord-59d51-default-rtdb.firebaseio.com/",
  projectId: "studentrecord-59d51",
  storageBucket: "studentrecord-59d51.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export { database };
