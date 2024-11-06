// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDD44l3XwfTW-7-5b4GZSlFhZB1h5m5Ks",
  authDomain: "email-pass-auth-ca27d.firebaseapp.com",
  projectId: "email-pass-auth-ca27d",
  storageBucket: "email-pass-auth-ca27d.firebasestorage.app",
  messagingSenderId: "577523014591",
  appId: "1:577523014591:web:5b2f82199a834fc9171f0a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
