// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/auth";
import "firebase/compat/analytics";
import "firebase/compat/functions";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfcNSghAD2tgszi-cs-6BRS4VV6CBRqAI",
  authDomain: "projset-6732e.firebaseapp.com",
  databaseURL: "https://projset-6732e-default-rtdb.firebaseio.com",
  projectId: "projset-6732e",
  storageBucket: "projset-6732e.appspot.com",
  messagingSenderId: "769824624990",
  appId: "1:769824624990:web:8d561108fb20ec8693ffcf",
  measurementId: "G-C9TWH79QP1"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
// const analytics = firebase.getAnalytics(app);

export default firebase;