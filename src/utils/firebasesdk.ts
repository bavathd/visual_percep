// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAovLn0hvOEC9lmP51z75ok33u1mOhcUTU",
  authDomain: "dcvpa-c.firebaseapp.com",
  projectId: "dcvpa-c",
  storageBucket: "dcvpa-c.firebasestorage.app",
  messagingSenderId: "313699850027",
  appId: "1:313699850027:web:bd28a252629ff44018176e",
  measurementId: "G-7RR72L5L3B"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);