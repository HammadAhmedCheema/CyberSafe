// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAw91wqh_ar60BdY5n2GFT2Nqi6fz-Jft4",
  authDomain: "webassignment-6829d.firebaseapp.com",
  projectId: "webassignment-6829d",
  storageBucket: "webassignment-6829d.firebasestorage.app",
  messagingSenderId: "12649599196",
  appId: "1:12649599196:web:e6ba1ec07ac9db6e052419",
  measurementId: "G-PHYEXSHP90"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);



  