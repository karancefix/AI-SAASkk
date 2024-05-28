// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCYMEEjHiEEp7b7iX5WkOGjKzmrq8R32DM",
    authDomain: "ai-saas-genius.firebaseapp.com",
    projectId: "ai-saas-genius",
    storageBucket: "ai-saas-genius.appspot.com",
    messagingSenderId: "87452647526",
    appId: "1:87452647526:web:ef810c43acbe8681526da7",
    measurementId: "G-1G4PQ5LG5R"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// export const db = getFirestore(app);
export const storage = getStorage();