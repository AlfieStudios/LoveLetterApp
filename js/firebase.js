import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDnYNJk5-lteteYnfaI3xbTN01dO5nYEb0",
  authDomain: "lettermessagingapp.firebaseapp.com",
  projectId: "lettermessagingapp",
  storageBucket: "lettermessagingapp.firebasestorage.app",
  messagingSenderId: "112974704944",
  appId: "1:112974704944:web:415f8e32a9bf898c89d8f5"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
