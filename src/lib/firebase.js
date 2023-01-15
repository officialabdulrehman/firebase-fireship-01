// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhB5i-fEkvHVLNoWeB0DQ1uglQuHs-yeY",
  authDomain: "fireship-tutorial-2c944.firebaseapp.com",
  projectId: "fireship-tutorial-2c944",
  storageBucket: "fireship-tutorial-2c944.appspot.com",
  messagingSenderId: "193805392865",
  appId: "1:193805392865:web:cd38129711966591a090a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuthService = getAuth(app)
const googleAuthProvider = new GoogleAuthProvider()

export const handleGoogleSignin = async () => {
  try {
    const user = await signInWithPopup(firebaseAuthService, googleAuthProvider)
    console.log("handleGoogleSignin::user => ", user)
  } catch (e) {
  }
}

export const handleLogout = async () => {
  try {
    await signOut(firebaseAuthService)
  } catch (e) {
  }
}

export const db = getFirestore(app);

export const thingsRef = collection(db, 'things')

// Get a list of cities from your database
export async function getThings() {
  const thingsCol = collection(db, 'things');
  const citySnapshot = await getDocs(thingsCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
}

export async function addThing(data) {
  const thingsCol = collection(db, 'things');
  const citySnapshot = await addDoc(thingsCol, data);
  return citySnapshot;
}