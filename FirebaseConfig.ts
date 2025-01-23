import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDM6O_9u5NmoFoaZYnEU0k72Xzb_i029_M',
  authDomain: 'pentavaluetask-d4af7.firebaseapp.com',
  projectId: 'pentavaluetask-d4af7',
  storageBucket: 'pentavaluetask-d4af7.firebasestorage.app',
  messagingSenderId: '307756883365',
  appId: '1:307756883365:web:bce9ec1e665e7d2e7edc4c',
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
