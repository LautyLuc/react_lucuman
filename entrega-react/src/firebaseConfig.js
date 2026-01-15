// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCh--2PrdIUmMCDg3wASxVuAZLP10o1IK8",
  authDomain: "coder-react-8e451.firebaseapp.com",
  projectId: "coder-react-8e451",
  storageBucket: "coder-react-8e451.firebasestorage.app",
  messagingSenderId: "1096300860417",
  appId: "1:1096300860417:web:7e30544e2f3aa300e09c00"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export app and a flag indicating whether Firebase is configured
export { app }
export const firebaseConfigured = Boolean(firebaseConfig.apiKey)