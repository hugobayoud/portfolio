import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

import { firebaseConfig } from './config';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
export const storage = getStorage(app);

export default app;
