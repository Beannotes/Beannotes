// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2YABwcCs8n7m-c8qf0x1IfM70OsCKDNI",
  authDomain: "coffee-log-9f8db.firebaseapp.com",
  projectId: "coffee-log-9f8db",
  storageBucket: "coffee-log-9f8db.appspot.com",
  messagingSenderId: "1047534750679",
  appId: "1:1047534750679:web:b949adabc23e1719ab1992"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { auth, db };

