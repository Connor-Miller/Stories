// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA1Wm_xSQPd2EXfl9TTNirp88tHjvhQH5A",
    authDomain: "our-legacy-91adb.firebaseapp.com",
    projectId: "our-legacy-91adb",
    storageBucket: "our-legacy-91adb.appspot.com",
    messagingSenderId: "176843671732",
    appId: "1:176843671732:web:8b101b8ad78878a6446fe1",
    measurementId: "G-4HPP6V3KFG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };