import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC-xpC9PkIMgq_93St7pwxYVJ-W0PovoJg",
    authDomain: "neows-sdkss.firebaseapp.com",
    databaseURL: "https://neows-sdkss.firebaseio.com",
    projectId: "neows-sdkss",
    storageBucket: "neows-sdkss.appspot.com",
    messagingSenderId: "779379851566",
    appId: "1:779379851566:web:576ed3fef76da1167cbabf",
    measurementId: "G-WEPDJBJNP9"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
// const auth = firebase.auth();
// const provider = new firebase.auth.GoogleAuthProvider();

// export { auth, provider };
export default db;