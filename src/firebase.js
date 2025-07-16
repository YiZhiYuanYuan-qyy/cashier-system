// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHKxHWH_7tMYF77bMQb_Dw4NHbmTGa7lc",
  authDomain: "cashier-system-b03d7.firebaseapp.com",
  projectId: "cashier-system-b03d7",
  storageBucket: "cashier-system-b03d7.firebasestorage.app",
  messagingSenderId: "775541994758",
  appId: "1:775541994758:web:ac116d22696311bfd25a87",
  measurementId: "G-4TVNC5DZMG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);