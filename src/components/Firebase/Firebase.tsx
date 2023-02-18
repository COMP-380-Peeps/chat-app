import firebase from 'firebase/compat/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDp53dfDGA4a5d79ueru2AjVVZDXuuFQng",
    authDomain: "chat-app-ef4ca.firebaseapp.com",
    projectId: "chat-app-ef4ca",
    storageBucket: "chat-app-ef4ca.appspot.com",
    messagingSenderId: "917169921294",
    appId: "1:917169921294:web:4469844c1971b21dbb4b5f",
    measurementId: "G-WM986YM6M7"
}

const firebase_config = firebase.initializeApp(config);

export default firebase_config;
