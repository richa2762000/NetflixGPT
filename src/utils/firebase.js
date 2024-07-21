// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAW7dTm2WsIw7xoFEXPOrBOBJJd5LGLBs",
  authDomain: "netflix-gpt-802d1.firebaseapp.com",
  projectId: "netflix-gpt-802d1",
  storageBucket: "netflix-gpt-802d1.appspot.com",
  messagingSenderId: "269518519916",
  appId: "1:269518519916:web:8862c6f69b62739bac6249",
  measurementId: "G-RH7RRWNZR7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(); 