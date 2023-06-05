// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCsjgytXRzjQ-JRzU9Kbq-4xfJQ7NR3XeY",
  authDomain: "fir-login-dc885.firebaseapp.com",
  projectId: "fir-login-dc885",
  storageBucket: "fir-login-dc885.appspot.com",
  messagingSenderId: "1059181595525",
  appId: "1:1059181595525:web:99ec51bb52c7330d4dd2ec",
  measurementId: "G-7WM0X7C4MR"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export default db;