import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDwhRoIwD5_mZHN_SEf3nPCbfconO3CKdM",
  authDomain: "chromaksa-studio.firebaseapp.com",
  projectId: "chromaksa-studio",
  storageBucket: "chromaksa-studio.firebasestorage.app",
  messagingSenderId: "80467640174",
  appId: "1:80467640174:web:4019028a1b9e53ceaa4b7f"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
