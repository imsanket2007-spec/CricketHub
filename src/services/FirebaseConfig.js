import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAGDJhYXVgeCYIm5bJSZnS_ZhdzynZ4gB4",
  authDomain: "crickethub-c7b3a.firebaseapp.com",
  projectId: "crickethub-c7b3a",
  storageBucket: "crickethub-c7b3a.firebasestorage.app",
  messagingSenderId: "885034339278",
  appId: "1:885034339278:web:99a7667b8086df005eb99f"
};
  
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);