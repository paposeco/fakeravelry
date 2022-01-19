import { initializeApp } from "firebase/app";
import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    getDocs,
    collection,
    updateDoc,
    arrayUnion,
} from "firebase/firestore";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    initializeAuth,
} from "firebase/auth";

import { User as FirebaseUser } from "firebase/auth";

import type { Needles, Hooks } from "./components/common/types";
import { projectFetchedFromDB } from "./components/projects/projectsSlice";

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
    initFirebaseAuth();
    return db;
};

const initFirebaseAuth = function() {
    onAuthStateChanged(getAuth(), authStateObserver);
};

const uploadPhoto = async function(projectid: string, file: File) {
    try {
        if (auth.currentUser !== null) {
            //upload file to storage bucket
            const filePath = `${auth.currentUser.uid}/${projectid}/${file.name}`;
            const newImageRef = ref(getStorage(), filePath);
            const fileSnapshot = await uploadBytesResumable(newImageRef, file);
            const publicImageUrl = await getDownloadURL(newImageRef);

            //update project
            const projectRef = doc(
                database,
                "users",
                auth.currentUser.uid,
                "projects",
                projectid
            );
            updateDoc(projectRef, {
                imageUrl: publicImageUrl,
                storageUri: fileSnapshot.metadata.fullPath,
            });
            return publicImageUrl;
        }
    } catch (error) {
        console.log(error);
    }
};

const createUser = async function(
    email: string,
    password: string,
    username: string,
    nameSelected: string
) {
    const checkUsernameDoesntExist = await checkUniqueUsername(username);
    if (checkUsernameDoesntExist === true) {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user: string = userCredential.user.uid;
                startEmptyProfile(user, email, username, nameSelected);
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage);
                // ..
            });
    } else {
        return "user already exists";
    }
};

const startEmptyProfile = async function(
    userId: string,
    email: string,
    username: string,
    nameSelected: string
) {
    await setDoc(doc(database, "users", userId), {
        username: username,
        name: nameSelected,
        email: email,
    });
    const docRef = doc(database, "usernames", "usernamescollection");
    await updateDoc(docRef, {
        all: arrayUnion({ userid: userId, username: username }),
    });
};

const authStateObserver = function() {
    const user = auth.currentUser;
    if (user !== null) {
        fetchUserInfo(user);
    }
};
const fetchUserInfo = async function(user: FirebaseUser) {
    const querySnapshot = await getDocs(
        collection(database, "users", user.uid, "projects")
    );
};

const signIn = async function(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            //fetchUserInfo(user);
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

const checkUniqueUsername = async function(desiredusername: string) {
    const docRef = doc(database, "usernames", "usernamescollection");
    const docSnap = await getDoc(docRef);
    const lowercaseusername = desiredusername.toLowerCase();
    if (docSnap.exists()) {
        const usernames = docSnap.data();
        const usernamesarray: { userird: string; username: string }[] =
            usernames.all;
        let usernameisunique: boolean = true;
        for (let i = 0; i < usernamesarray.length; i++) {
            if (usernamesarray[i].username.toLowerCase() === lowercaseusername) {
                usernameisunique = false;
                break;
            }
        }
        return usernameisunique;
    }
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
            } else if (infotofetch === "both") {
                return [userinfo.username, userinfo.name, user.uid];
            }
        }
    }
};

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
            imageUrl: "",
            storageUri: "",
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
                    numberStsOrRepeats: undefined,
                    horizontalunits: "stitches",
                    numberRows: undefined,
                    gaugesize: "",
                    gaugepattern: "",
                },
                yarn: [],
                projectnotes: "",
            },
            projectstatus: {
                progresstatus: "In progress",
                progressrange: "0",
                happiness: "",
                starteddate: "",
                completeddate: "",
            },
        });
    }
};

const linkToRaveler = async function(username: string) {
    const docRef = doc(database, "usernames", "usernamescollection");
    const docSnap = await getDoc(docRef);
    const usernamelowercase = username.toLowerCase();
    let userID = "";
    if (docSnap.exists()) {
        const usernames = docSnap.data();
        const usernamesarray: { userid: string; username: string }[] =
            usernames.all;
        let userExists = false;
        for (let i = 0; i < usernamesarray.length; i++) {
            if (usernamesarray[i].username.toLowerCase() === usernamelowercase) {
                userExists = true;
                userID = usernamesarray[i].userid;
                break;
            }
        }
        if (userExists) {
            //when someone tries to access someone elses profiles, it needs to query the db and get everything about the user and place it in store maybe
            return `/people/${username}`;
        } else {
            return "";
        }
    } else {
        return "error in db";
    }
};

// have to make sure user can't edit other peoples projects
const updateProjectInDB = async function(
    currentprojectid: string,
    crafttypeUpdated: string,
    projectnameUpdated: string,
    patternusedUpdated: string,
    patternnameUpdated: string,
    aboutUpdated: string,
    madeforUpdated: string,
    linktoravelerUpdated: string,
    finishbyUpdated: string,
    sizemadeUpdated: string,
    patternfromUpdated: string,
    patterncategoryUpdated: string,
    tagsUpdated: string,
    needlesUpdated: Needles[],
    hooksUpdated: Hooks[],
    numberStsOrRepeatsUpdated: number | undefined,
    horizontalunitsUpdated: string,
    numberRowsUpdated: number | undefined,
    gaugesizeUpdated: string,
    gaugepatternUpdated: string,
    yarnUpdated: string,
    projectnotesUpdated: string,
    progressstatusUpdated: string,
    progressrangeUpdated: string,
    happinessUpdated: string,
    starteddateUpdated: string,
    completeddateUpdated: string
) {
    const user = auth.currentUser;
    if (user !== null) {
        const projectRef = doc(
            database,
            "users",
            user.uid,
            "projects",
            currentprojectid
        );
        await updateDoc(projectRef, {
            crafttype: crafttypeUpdated,
            projectname: projectnameUpdated,
            patternused: patternusedUpdated,
            pattern: { name: patternnameUpdated, about: aboutUpdated },
            projectinfo: {
                madefor: madeforUpdated,
                linktoraveler: linktoravelerUpdated,
                finishby: finishbyUpdated,
                sizemade: sizemadeUpdated,
                patternfrom: patternfromUpdated,
                patterncategory: patterncategoryUpdated,
                tags: tagsUpdated,
                needles: needlesUpdated,
                hooks: hooksUpdated,
                gauge: {
                    numberStsOrRepeats: numberStsOrRepeatsUpdated,
                    horizontalunits: horizontalunitsUpdated,
                    numberRows: numberRowsUpdated,
                    gaugesize: gaugesizeUpdated,
                    gaugepattern: gaugepatternUpdated,
                },
                yarn: yarnUpdated,
                projectnotes: projectnotesUpdated,
            },
            projectstatus: {
                progressstatus: progressstatusUpdated,
                progressrange: progressrangeUpdated,
                happiness: happinessUpdated,
                starteddate: starteddateUpdated,
                completeddate: completeddateUpdated,
            },
        });
    }
};

const database = startDB();
let auth = getAuth();

export default startDB;
export {
    createUser,
    auth,
    signIn,
    signOutUser,
    getInfo,
    addProjectToNotebook,
    updateProjectInDB,
    uploadPhoto,
    linkToRaveler,
};

// quando faz displayproject, se o userid que está in store nao fizer match ao user que esta a tentar ver o projecto, tem de ir buscar a informacao do projecto a db
