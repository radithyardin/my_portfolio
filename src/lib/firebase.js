// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmnl0KY5eKF4A4_YbvzpVqC3_atQTfmZE",
  authDomain: "chatroom-e5d5a.firebaseapp.com",
  projectId: "chatroom-e5d5a",
  storageBucket: "chatroom-e5d5a.firebasestorage.app",
  messagingSenderId: "681228154752",
  appId: "1:681228154752:web:7cb26290200037501f3365",
  measurementId: "G-C9SB7FEPDE",
   databaseURL: "https://chatroom-e5d5a-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getDatabase(app);
