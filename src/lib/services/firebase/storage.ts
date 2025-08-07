import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';

import { firebaseConfig } from './config';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
export const storage = getStorage(app);

// Initialize Firebase Realtime Database
export const database = getDatabase(app);

// Initialize Firestore
export const firestore = getFirestore(app, 'portfolio-main');

export default app;
