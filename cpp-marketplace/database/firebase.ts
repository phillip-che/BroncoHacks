// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
import * as firestore from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMyFZ3LzbYzyKevYvuM40cRdpq7mZxjIU",
  authDomain: "cpp-marketplace-2524d.firebaseapp.com",
  projectId: "cpp-marketplace-2524d",
  storageBucket: "cpp-marketplace-2524d.appspot.com",
  messagingSenderId: "81035075948",
  appId: "1:81035075948:web:3889d6a2e17e47290f5349",
  measurementId: "G-CF7WDLCQ39"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firestore.getFirestore(app);

export const auth = getAuth();

export default db;