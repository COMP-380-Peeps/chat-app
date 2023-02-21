import firebase from 'firebase/compat/app';
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const default_config = {
    apiKey: "AIzaSyDp53dfDGA4a5d79ueru2AjVVZDXuuFQng",
    authDomain: "chat-app-ef4ca.firebaseapp.com",
    projectId: "chat-app-ef4ca",
    storageBucket: "chat-app-ef4ca.appspot.com",
    messagingSenderId: "917169921294",
    appId: "1:917169921294:web:4469844c1971b21dbb4b5f",
    measurementId: "G-WM986YM6M7",
}
// Connect to local emulator if running in development
const env = process.env.NODE_ENV;
const app = firebase.initializeApp(default_config);
const db = getFirestore(app);

if (env === 'development') {
    connectFirestoreEmulator(db, 'localhost', 8080);
}
const auth = getAuth(app)
const googleAuthProvider = new GoogleAuthProvider();
export {app, auth, googleAuthProvider, db}