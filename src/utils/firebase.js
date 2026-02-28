import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC9RLMMB8YBX1SCV5OM6uobIZ8HuSeM2MM",
    authDomain: "taskflow-pro-webapp-9076.firebaseapp.com",
    projectId: "taskflow-pro-webapp-9076",
    storageBucket: "taskflow-pro-webapp-9076.firebasestorage.app",
    messagingSenderId: "300825227331",
    appId: "1:300825227331:web:69e7acd9caa94595e1a4f6"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
