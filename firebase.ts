import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCI8LefvALsxHtxB89a-OVRDePPdzHIUlQ",
    authDomain: "taskbhai-5f5e2.firebaseapp.com",
    projectId: "taskbhai-5f5e2",
    storageBucket: "taskbhai-5f5e2.appspot.com",
    messagingSenderId: "587921638342",
    appId: "1:587921638342:web:f2c723f52d7d15d1bca8c7"
};

const app = initializeApp(firebaseConfig);

// Export Firebase authentication and Firestore services
export const auth = getAuth(app);
export const db = getFirestore(app);

