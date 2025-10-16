// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBouW44uo-9P4XQSlw9yPzNBYI_MosB81k",
  authDomain: "fir-conceptual-p-1.firebaseapp.com",
  projectId: "fir-conceptual-p-1",
  storageBucket: "fir-conceptual-p-1.firebasestorage.app",
  messagingSenderId: "160177622153",
  appId: "1:160177622153:web:6df3df3ccf4f6f9e778a58",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
