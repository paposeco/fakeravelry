import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
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

const database = startDB();
let auth = getAuth();

const createUser = function(
    email: string,
    password: string,
    username: string,
    nameSelected: string
) {
    //  startDB();
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
    //const db = startDB();
    await setDoc(doc(database, "users", userId), {
        username: username,
        name: nameSelected,
        email: email,
    });
};

// checks for unique email and username might take a while if i leave it like this

const signIn = async function(email: string, password: string) {
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
    signOut(auth)
        .then(() => {
            // Sign-out successful.
        })
        .catch((error) => {
            // An error happened.
        });
};

const getInfo = async function(infotofetch: string) {
    const user = auth.currentUser;
    if (user !== null) {
        const docRef = doc(database, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            // Convert to user object
            const userinfo = docSnap.data();
            if (infotofetch === "username") {
                return userinfo.username;
            } else if (infotofetch === "name") {
                return userinfo.name;
            }
        }
    }
};

// this isn't consistent with the project class
const addProjectToNotebook = async function(
    projectid: string,
    craftType: string,
    projectname: string,
    patternused: string,
    patternname: string
) {
    const user = auth.currentUser;
    if (user !== null) {
        await setDoc(doc(database, "users", user.uid, "projects", projectid), {
            photo: false,
            crafttype: craftType,
            projectname: projectname,
            patternused: patternused,
            pattern: { name: patternname, about: "" },
            projectinfo: {
                madefor: "",
                linktoraveler: "",
                finishby: "",
                sizemade: "",
                patternfrom: "",
                patterncategory: "",
                tags: "",
                needles: [],
                hooks: [],
                gauge: {
                    numberStsOrRepeats: "",
                    stitches: true,
                    numberRows: null,
                    gaugesize: "",
                },
                gaugepattern: "",
                yarn: [],
                projectnotes: "",
            },
            projectstatus: {
                status: "In progress",
                progressrange: 0,
                happiness: "",
                starteddate: "",
                completeddate: "",
            },
        });
    }
};

//storage
//email authentication

export default startDB;
export { createUser, auth, signIn, signOutUser, getInfo, addProjectToNotebook };
