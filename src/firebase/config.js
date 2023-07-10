import firebase from "firebase/compat/app";

import "firebase/compat/analytics";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA6QOaNRIRx5-iMfMIz9_gq0gHESTIuwoc",
  authDomain: "musicmid-9b2c6.firebaseapp.com",
  projectId: "musicmid-9b2c6",
  storageBucket: "musicmid-9b2c6.appspot.com",
  messagingSenderId: "44087016862",
  appId: "1:44087016862:web:6982f495b5756c1c38aa8f",
  measurementId: "G-5JK6TFX7KP",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

if (window.location.hostname === "localhost") {
  // auth.useEmulator("http://localhost:9099");
  db.useEmulator("localhost", "3000");
}

export { db, auth };
export default firebase;
