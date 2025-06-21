import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDI7RJGzVsp9F_ySznsOBbj48BoFmgFkfA",
  authDomain: "peresonal-task-manager.firebaseapp.com",
  projectId: "peresonal-task-manager",
  storageBucket: "peresonal-task-manager.firebasestorage.app",
  messagingSenderId: "724668981946",
  appId: "1:724668981946:web:7717859f4ff14df6d75883"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // We’ll use this to read/write tasks
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
