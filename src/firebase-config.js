import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {

  apiKey: "AIzaSyD8hpEPWbrtOoUFVIZetc0I20LFL6CWqVM",
  authDomain: "scan-to-healthify-7a136.firebaseapp.com",
  projectId: "scan-to-healthify-7a136",
  storageBucket: "scan-to-healthify-7a136.appspot.com",
  messagingSenderId: "942851217908",
  appId: "1:942851217908:web:cf08ef3997ec6d60ed81a1"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);