import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDdYFgVdCx_s5p7kwvcLGaqOBt6YB71dCo',
  authDomain: 'location-2f9a1.firebaseapp.com',
  projectId: 'location-2f9a1',
  storageBucket: 'location-2f9a1.appspot.com',
  messagingSenderId: '733272126288',
  appId: '1:733272126288:web:d887ec52d7a3f7bfd37255',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
