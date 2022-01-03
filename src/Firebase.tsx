import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA1i11bP3s4ppzKH2MYBEkdjIlt8yW-KeU",
    authDomain: "fakeravelry.firebaseapp.com",
    projectId: "fakeravelry",
    storageBucket: "fakeravelry.appspot.com",
    messagingSenderId: "923124924710",
    appId: "1:923124924710:web:b5395ff184a0068070c1e7",
};

const startDB = function() {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    return db;
};

const createUser = function(
    email: string,
    password: string,
    username: string,
    nameSelected: string
) {
    startDB();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user: string = userCredential.user.uid;
            startEmptyProfile(user, email, username, nameSelected);
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
            // ..
        });
};

const startEmptyProfile = async function(
    userId: string,
    email: string,
    username: string,
    nameSelected: string
) {
    const db = startDB();
    await setDoc(doc(db, "users", userId), {
        username: username,
        name: nameSelected,
        email: email,
    });
};

// checks for unique email and username might take a while if i leave it like this

const signIn = async function(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
};

const signOutUser = async function() {
    const auth = getAuth();
    signOut(auth)
        .then(() => {
            // Sign-out successful.
        })
        .catch((error) => {
            // An error happened.
        });
};

const authObserver = async function() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            // ...
        } else {
            // User is signed out
            // ...
        }
    });
};

//storage
//email authentication

export default startDB;
export { createUser };
