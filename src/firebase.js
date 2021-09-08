import firebase from 'firebase'
import 'firebase/firestore';

//Initializes our firebase
const firebaseConfig = {
  apiKey: "AIzaSyDJ1mFeUe5JSIcfOj56ZdZVHLxP6urC494",
  authDomain: "my-project-1511639827773.firebaseapp.com",
  databaseURL: "https://my-project-1511639827773-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "my-project-1511639827773",
  storageBucket: "my-project-1511639827773.appspot.com",
  messagingSenderId: "396974604390",
  appId: "1:396974604390:web:e2b953a1dbc30f6d9f2da7"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

// Imports database, authentication system

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();


export {db, auth, firebaseApp}