// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlWtm8GRhA7VUdD_xdvz5HBv3zb418_zE",
  authDomain: "xclone-957d3.firebaseapp.com",
  projectId: "xclone-957d3",
  storageBucket: "xclone-957d3.appspot.com",
  messagingSenderId: "193496591640",
  appId: "1:193496591640:web:1c704a97f429c03629426d",
  measurementId: "G-BF6FVH9HZX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)
const storage = getStorage(app)
//const analytics = getAnalytics(app);


export {auth, db, storage}