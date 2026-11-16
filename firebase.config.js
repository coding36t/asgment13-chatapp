import { initializeApp } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-firestore.js";


// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDVP7Pq-j-WGslKa0tE9k9i7VaGw4GhIBk",
  authDomain: "chat-app-e28c7.firebaseapp.com",
  projectId: "chat-app-e28c7",
  storageBucket: "chat-app-e28c7.firebasestorage.app",
  messagingSenderId: "572256615094",
  appId: "1:572256615094:web:9841ec78fc133111b48417"
}; 


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
