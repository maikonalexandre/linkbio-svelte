import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDqnkutGZZjbiL06P5XpvTy61iOtqGgG3w",
    authDomain: "sveltcourse.firebaseapp.com",
    projectId: "sveltcourse",
    storageBucket: "sveltcourse.appspot.com",
    messagingSenderId: "187409395710",
    appId: "1:187409395710:web:36c5d3dabec8c4d8addaaf",
    measurementId: "G-WTVKF4KS32",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
export const auth = getAuth();
export const firestore = getFirestore();
