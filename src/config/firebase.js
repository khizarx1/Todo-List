// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore/lite";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyADDZ-WkiYMsKEXzPbIKrq-LPZFHbz6DwM",
    authDomain: "todo-list-eb231.firebaseapp.com",
    projectId: "todo-list-eb231",
    storageBucket: "todo-list-eb231.firebasestorage.app",
    messagingSenderId: "346406288847",
    appId: "1:346406288847:web:9cbeb9a185072ded8aa6ba",
    measurementId: "G-NMRSHNP4Q0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app)
const storage = getStorage(app)

export { analytics, auth, firestore, storage }