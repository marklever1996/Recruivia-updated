import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBhFh3Qqh3S6cROemqF4SAwfwperJ5plz8",
    authDomain: "recruivia.firebaseapp.com",
    projectId: "recruivia",
    storageBucket: "recruivia.firebasestorage.app",
    messagingSenderId: "1011798115477",
    appId: "1:1011798115477:web:929707575aa80cc117079c",
    measurementId: "G-2L3HWMY159"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app); 