import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAvGhqOoUyZ26NX1IgIj9Tfhzx82KSaiEk',
  authDomain: 'portfolio-c336c.firebaseapp.com',
  projectId: 'portfolio-c336c',
  storageBucket: 'portfolio-c336c.firebasestorage.app',
  messagingSenderId: '527681504318',
  appId: '1:527681504318:web:a561cf6d8187c9e2307d6f',
  measurementId: 'G-N4V8S4JMN2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
export const storage = getStorage(app);

export default app;
