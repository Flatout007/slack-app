
import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider, Auth } from "firebase/auth";
import { Firestore, getFirestore, collection, CollectionReference } from "firebase/firestore";

const firebaseConfigObject: FirebaseOptions = {
    apiKey: "AIzaSyAfSY1XBlpQeByO8be2BV0_-pXLOZ6yd9A",
    authDomain: "slack-app-4cd41.firebaseapp.com",
    projectId: "slack-app-4cd41",
    storageBucket: "slack-app-4cd41.appspot.com",
    messagingSenderId: "862995767443",
    appId: "1:862995767443:web:4030452148fef0fafb6d66",
    measurementId: "G-LJ1TRHR144"
};

// returns and initializes a new firebase app
const app: FirebaseApp = initializeApp(firebaseConfigObject);

// returns an auth object and grants access to firebase's auth system
const auth: Auth = getAuth(app);

// returns a new google authentication object provided by firebase 
const googleAuth: GoogleAuthProvider = new GoogleAuthProvider();

// returns a new firestore cloud object instance and connects to cloud db
const firestore: Firestore = getFirestore(app);

const roomCollection: CollectionReference = collection(firestore, "room");

const roomMessageCollection: CollectionReference = collection(firestore, "room/messages", "message");

export {roomCollection, auth, googleAuth, firestore, roomMessageCollection};
