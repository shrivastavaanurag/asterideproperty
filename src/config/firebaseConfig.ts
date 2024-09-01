import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBiwuV-8lo6Mx-9GakLu-7HVf1ExEXou7c",
  authDomain: "asteride-b14a1.firebaseapp.com",
  databaseURL: "https://asteride-b14a1-default-rtdb.firebaseio.com",
  projectId: "asteride-b14a1",
  storageBucket: "asteride-b14a1.appspot.com",
  messagingSenderId: "63754940319",
  appId: "1:63754940319:web:cbdded7882248d9a4a17aa",
  measurementId: "G-KH2YRCGQ1K"
};

// if (firebase.app.length === 0) {
//   firebase.initializeApp(firebaseConfig);
// }

// const database = getDatabase();

// export { database } ;

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  console.log('Firebase initialized');
} else {
  app = getApp();
  console.log('Firebase app already initialized');
}

// Initialize Firebase services
const auth = getAuth(app);
const database = getDatabase();

// Export the services for use in your app
export { auth, database };