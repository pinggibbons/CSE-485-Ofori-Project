// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBF39Qq8pRq-3VTUBNMQ3aCAn3O39myODk",
  authDomain: "ofori-feedback.firebaseapp.com",
  projectId: "ofori-feedback",
  storageBucket: "ofori-feedback.appspot.com",
  messagingSenderId: "745180114990",
  appId: "1:745180114990:web:8e5f84413ed1e8a8e46fbf",
  measurementId: "G-1ZXPCM4YR5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

if (process.env.NODE_ENV === 'development') {
  connectFunctionsEmulator(getFunctions(app), "localhost", 5001);
}

export { app, auth };