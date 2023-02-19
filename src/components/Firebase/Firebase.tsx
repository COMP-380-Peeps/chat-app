import firebase from 'firebase/compat/app';
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const config = {
    apiKey: "AIzaSyDp53dfDGA4a5d79ueru2AjVVZDXuuFQng",
    authDomain: "chat-app-ef4ca.firebaseapp.com",
    projectId: "chat-app-ef4ca",
    storageBucket: "chat-app-ef4ca.appspot.com",
    messagingSenderId: "917169921294",
    appId: "1:917169921294:web:4469844c1971b21dbb4b5f",
    measurementId: "G-WM986YM6M7"
}

const app = firebase.initializeApp(config);
const auth = getAuth(app)
const db = getFirestore(app);
const googleAuthProvider = new GoogleAuthProvider();
export {app, auth, googleAuthProvider, db}