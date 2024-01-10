// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5Cpk2xYZWuBzWkHAM9BXbr0GHThiWSDk",
  authDomain: "airfly-302e1.firebaseapp.com",
  projectId: "airfly-302e1",
  storageBucket: "airfly-302e1.appspot.com",
  messagingSenderId: "933488529437",
  appId: "1:933488529437:web:95ac832cca9dd64ee176f4",
  measurementId: "G-V55D2K6ZF5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);