import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

import { getFirestore } from "firebase/firestore";


/*const firebaseConfig = {
  apiKey: "AIzaSyB_k86lWVji3-ah5_L7GLot1BB6INVbdos",
  authDomain: "orbital5679.firebaseapp.com",
  projectId: "orbital5679",
  storageBucket: "orbital5679.appspot.com",
  messagingSenderId: "672083476193",
  appId: "1:672083476193:web:7192f8d6d1366f39c801a0",
  measurementId: "G-N9LY831YEH",
};  */

const firebaseConfig = {
  apiKey: "AIzaSyCiq7V2hxT-WiRMWD_T1xS_je1lgetT-U8",
  authDomain: "test1-0807.firebaseapp.com",
  databaseURL: "https://test1-0807-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "test1-0807",
  storageBucket: "test1-0807.appspot.com",
  messagingSenderId: "1086825386299",
  appId: "1:1086825386299:web:1729c901063e3c170a671e",
  measurementId: "G-RGWLW4ZLWF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider(app);

export const auth = getAuth(app);
