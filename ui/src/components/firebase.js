// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAcllX7DTQZSnf66H2RJdRRM5pG934g11A",
  authDomain: "view3dify.firebaseapp.com",
  projectId: "view3dify",
  storageBucket: "view3dify.firebasestorage.app",
  messagingSenderId: "86624465874",
  appId: "1:86624465874:web:23c7d14bdc710fbf9d8e0b",
  measurementId: "G-YJS9X6VZ7E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider(); // Create Google provider

export { auth, googleProvider }; // Export the Google provider