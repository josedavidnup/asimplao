// import * as firebase from "firebase";
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
};
// const firebaseConfig = {
//   apiKey: 'AIzaSyD7bQ03-KfSpRlaaNzddyC7rnJp8lnVUNM',
//   authDomain: 'asimplao-e-commerce.firebaseapp.com',
//   projectId: 'asimplao-e-commerce',
//   storageBucket: 'asimplao-e-commerce.appspot.com',
//   messagingSenderId: '814294264082',
//   appId: '1:814294264082:web:a07dcf2c703349c4992bcb',
// };

// Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
