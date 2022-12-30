// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-J14c6HrPOtFRu_EtcIgJ9250Zdl7EHs",
  authDomain: "coinsearch-7c55f.firebaseapp.com",
  projectId: "coinsearch-7c55f",
  storageBucket: "coinsearch-7c55f.appspot.com",
  messagingSenderId: "148457193398",
  appId: "1:148457193398:web:e36f63a29b8644b54a0b17"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app