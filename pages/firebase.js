import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD8rlJPZCiKlggdk81yPn97Ov7_ryXA9iI",
  authDomain: "petbuddy-cwd.firebaseapp.com",
  projectId: "petbuddy-cwd",
  storageBucket: "petbuddy-cwd.appspot.com",
  messagingSenderId: "760393224272",
  appId: "1:760393224272:web:c97eca95e0352d27ea8155",
  measurementId: "G-W655Z3VJNB"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };