
import 'firebase/firestore'


// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKZ8Svrw1NTrXRQcYVZ-bMGkBqk1lG_AE",
  authDomain: "finance-app-70825.firebaseapp.com",
  projectId: "finance-app-70825",
  storageBucket: "finance-app-70825.appspot.com",
  messagingSenderId: "992683170303",
  appId: "1:992683170303:web:4830d1e7a02d8cdefc6fca"
};

// Initialize Firebase


const app = initializeApp(firebaseConfig);

const projectFirestore = getFirestore(app);
const projectAuth = getAuth(app);


export {projectFirestore, projectAuth}