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
    arrayRemove,
    query,
    where,
    increment,
    addDoc,
    deleteDoc,
} from "firebase/firestore";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
    deleteObject,
} from "firebase/storage";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";

import type {
    Needles,
    Hooks,
    ProfileInformation,
} from "./components/common/types";

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

const authStateObserver = function() { };

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
        return false;
    }
};

const deletePhoto = async function(projectid: string) {
    try {
        const user = auth.currentUser;
        if (user !== null) {
            //get storageuri from project
            const projectRef = doc(
                database,
                "users",
                user.uid,
                "projects",
                projectid
            );
            const projectSnap = await getDoc(projectRef);
            if (projectSnap.exists()) {
                const photoURI = projectSnap.data().storageUri;
                const storage = getStorage();
                const photoreference = ref(storage, photoURI);
                deleteObject(photoreference)
                    .then(() => {
                        updateDoc(projectRef, {
                            imageUrl: "",
                            storageUri: "",
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }
    } catch (error) {
        console.log(error);
    }
};

const uploadProfilePhoto = async function(file: File) {
    try {
        if (auth.currentUser !== null) {
            //upload file to storage bucket
            const filePath = `${auth.currentUser.uid}/${file.name}`;
            const newImageRef = ref(getStorage(), filePath);
            await uploadBytesResumable(newImageRef, file);
            const publicImageUrl = await getDownloadURL(newImageRef);
            return publicImageUrl;
        }
    } catch (error) {
        console.log(error);
        return false;
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
    try {
        await setDoc(doc(database, "users", userId), {
            username: username,
            name: nameSelected,
            email: email,
        });
    } catch (error) {
        console.log(error);
    }

    const docRef = doc(database, "usernames", "usernamescollection");
    try {
        await updateDoc(docRef, {
            all: arrayUnion({ userid: userId, username: username }),
        });
    } catch (error) {
        console.log(error);
    }
};

const addInfoToProfile = async function(
    imageurl: string,
    name: string,
    personalsite: string,
    selectedcountry: string,
    yearsknitting: string,
    yearscrocheting: string,
    petskids: string,
    favoritecolors: string,
    favecurseword: string,
    aboutme: string
) {
    try {
        const user = auth.currentUser;
        if (user !== null) {
            const userRef = doc(database, "users", user.uid);
            await updateDoc(userRef, {
                imageurl: imageurl,
                name: name,
                personalsite: personalsite,
                selectedcountry: selectedcountry,
                yearsknitting: yearsknitting,
                yearscrocheting: yearscrocheting,
                petskids: petskids,
                favoritecolors: favoritecolors,
                favecurseword: favecurseword,
                aboutme: aboutme,
            });
        }
    } catch (error) {
        console.log(error);
    }
};

const addFriendDB = async function(friendusername: string) {
    const user = auth.currentUser;
    if (user !== null) {
        try {
            const userRef = doc(database, "users", user.uid);
            await updateDoc(userRef, {
                friendslist: arrayUnion(friendusername),
            });
        } catch (error) {
            console.log(error);
        }
    }
};

const removeFriendDB = async function(friendusername: string) {
    const user = auth.currentUser;
    if (user !== null) {
        try {
            const userRef = doc(database, "users", user.uid);
            await updateDoc(userRef, {
                friendslist: arrayRemove(friendusername),
            });
        } catch (error) {
            console.log(error);
        }
    }
};

// projects
const fetchUserInfo = async function() {
    const user = auth.currentUser;
    if (user !== null) {
        try {
            const querySnapshot = await getDocs(
                collection(database, "users", user.uid, "projects")
            );
            return querySnapshot;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
};

const fetchOtherUserInfo = async function(username: string) {
    const loggedInUser = auth.currentUser;
    if (loggedInUser !== null) {
        const userid = await getUserID(username);
        if (userid === false) {
            return "user not found"; //404
        } else if (userid !== undefined) {
            const querySnapshot = await getDocs(
                collection(database, "users", userid!, "projects")
            );
            return querySnapshot;
        }
    }
};

const signIn = async function(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => { })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
};

const signOutUser = async function() {
    signOut(auth)
        .then(() => { })
        .catch((error) => {
            console.log(error);
        });
};

// no spaces
const getUserID = async function(username: string) {
    const user = auth.currentUser;
    if (user !== null) {
        const docRef = doc(database, "usernames", "usernamescollection");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const usernames = docSnap.data();
            const usernamesarray: { userid: string; username: string }[] =
                usernames.all;
            const userOnArray = usernamesarray.find(
                (element) => element.username === username
            );
            if (userOnArray !== undefined) {
                return userOnArray.userid;
            } else {
                return false;
            }
        }
    }
};

const getUserProfileInformation = async function(userId: string) {
    const user = auth.currentUser;
    if (user !== null) {
        try {
            const docRef = doc(database, "users", userId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const alldata = docSnap.data();
                const profileinfo: ProfileInformation = {
                    username: alldata.username,
                    imageurl: alldata.imageurl,
                    name: alldata.name,
                    personalsite: alldata.personalsite,
                    selectedcountry: alldata.selectedcountry,
                    yearsknitting: alldata.yearsknitting,
                    yearscrocheting: alldata.yearscrocheting,
                    petskids: alldata.petskids,
                    favoritecolors: alldata.favoritecolors,
                    favecurseword: alldata.favecurseword,
                    aboutme: alldata.aboutme,
                };
                return profileinfo;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }
};

const getUserProfileImage = async function() {
    const user = auth.currentUser;
    if (user !== null) {
        try {
            const docRef = doc(database, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const alldata = docSnap.data();
                return alldata.imageurl;
            } else {
                return "";
            }
        } catch (error) {
            console.log(error);
            return "";
        }
    }
};

const checkUniqueUsername = async function(desiredusername: string) {
    const docRef = doc(database, "usernames", "usernamescollection");
    const docSnap = await getDoc(docRef);
    const lowercaseusername = desiredusername.toLowerCase();
    if (docSnap.exists()) {
        const usernames = docSnap.data();
        const usernamesarray: { userid: string; username: string }[] =
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

const checkUniqueProjectName = async function(desiredprojectname: string) {
    const cleanProjectName = desiredprojectname
        .toLowerCase()
        .trim()
        .replace(/ /g, "-");
    const user = auth.currentUser;
    if (user !== null) {
        const projectNamesRef = collection(
            database,
            "users",
            user.uid,
            "projectnames"
        );
        const q = query(projectNamesRef, where("name", "==", cleanProjectName));
        const docSnap = await getDocs(q);
        if (docSnap.docs.length !== 0) {
            // return count+1, and update count on db
            let currentCount: number = 1;
            let docId: string = "";
            docSnap.forEach((doc) => {
                docId = doc.id;
                currentCount += doc.data().count;
            });
            const projectNameRef = doc(
                database,
                "users",
                user.uid,
                "projectnames",
                docId
            );
            try {
                await updateDoc(projectNameRef, { count: increment(1) });
                return cleanProjectName + "-" + currentCount;
            } catch (error) {
                console.log(error);
                return false;
            }
        } else {
            // create new entry on db for choosen name
            try {
                await addDoc(collection(database, "users", user.uid, "projectnames"), {
                    name: cleanProjectName,
                    count: 1,
                });
                return cleanProjectName;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    } else {
        return "error";
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
            } else {
                //return email
                return userinfo.email;
            }
        }
    }
};

const getFriends = async function(userid: string) {
    const user = auth.currentUser;
    if (user !== null) {
        const docRef = doc(database, "users", userid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const friendslist = docSnap.data().friendslist;
            if (friendslist === undefined) {
                return [];
            } else {
                return friendslist;
            }
        }
    }
};

const getProfilePic = async function(friendusername: string) {
    const user = auth.currentUser;
    if (user !== null) {
        const frienduserid = await getUserID(friendusername);
        if (frienduserid !== undefined && frienduserid !== false) {
            const docRef = doc(database, "users", frienduserid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const userinfo = docSnap.data();
                return userinfo.imageurl;
            }
        } else {
            return false;
        }
    }
};

// name and username
const getOtherUserInfo = async function(username: string) {
    const loggedInUser = auth.currentUser;
    if (loggedInUser !== null) {
        const userid = await getUserID(username);
        if (userid === false) {
            return "user not found"; //404
        } else if (userid !== undefined) {
            const docRef = doc(database, "users", userid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const userinfo = docSnap.data();
                return [userinfo.username, userinfo.name, userid];
            }
        }
    }
};

const deleteProject = async function(projectid: string) {
    const user = auth.currentUser;
    if (user !== null) {
        try {
            await deleteDoc(doc(database, "users", user.uid, "projects", projectid));
        } catch (error) {
            console.log(error);
        }
    }
};

const addProjectToNotebook = async function(
    projectid: string,
    craftType: string,
    projectslug: string,
    projectname: string,
    patternused: string,
    patternname: string
) {
    const user = auth.currentUser;
    if (user !== null) {
        try {
            await setDoc(doc(database, "users", user.uid, "projects", projectid), {
                imageUrl: "",
                storageUri: "",
                crafttype: craftType,
                projectslug: projectslug,
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
                        numberStsOrRepeats: null,
                        horizontalunits: "stitches",
                        numberRows: null,
                        gaugesize: "",
                        gaugepattern: "",
                    },
                    yarn: "",
                    projectnotes: "",
                },
                projectstatus: {
                    progressstatus: "inprogress",
                    progressrange: "0",
                    happiness: "",
                    starteddate: "",
                    completeddate: "",
                },
            });
        } catch (error) {
            console.log(error);
        }
    }
};

const linkToRaveler = async function(username: string) {
    const docRef = doc(database, "usernames", "usernamescollection");
    const docSnap = await getDoc(docRef);
    const usernamelowercase = username.toLowerCase();
    if (docSnap.exists()) {
        const usernames = docSnap.data();
        const usernamesarray: { userid: string; username: string }[] =
            usernames.all;
        let userExists = false;
        for (let i = 0; i < usernamesarray.length; i++) {
            if (usernamesarray[i].username.toLowerCase() === usernamelowercase) {
                userExists = true;
                break;
            }
        }
        if (userExists) {
            return `/people/${username}`;
        } else {
            return "";
        }
    } else {
        return "error in db";
    }
};

const fetchCommunityMembers = async function() {
    const user = auth.currentUser;
    let allusers: { username: string; imageurl: string }[] = [];
    if (user !== null) {
        try {
            const querySnapshot = await getDocs(collection(database, "users"));
            querySnapshot.forEach((doc) => {
                const userdata = doc.data();
                allusers.push({
                    username: userdata.username,
                    imageurl: userdata.imageurl,
                });
            });
            return allusers;
        } catch (error) {
            console.log(error);
        }
    }
};

const searchUser = async function(username: string) {
    const user = auth.currentUser;
    if (user !== null) {
        const docRef = doc(database, "usernames", "usernamescollection");
        const docSnap = await getDoc(docRef);
        const usernamelowercase = username.toLowerCase();
        if (docSnap.exists()) {
            const usernames = docSnap.data();
            const usernamesarray: { userid: string; username: string }[] =
                usernames.all;
            let userExists = false;
            for (let i = 0; i < usernamesarray.length; i++) {
                if (usernamesarray[i].username.toLowerCase() === usernamelowercase) {
                    userExists = true;
                    break;
                }
            }
            return userExists;
        }
    }
};

const updateProjectInDB = async function(
    currentprojectid: string,
    crafttypeUpdated: string,
    projectslugUpdated: string,
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
    numberStsOrRepeatsUpdated: number | null,
    horizontalunitsUpdated: string,
    numberRowsUpdated: number | null,
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
        try {
            await updateDoc(projectRef, {
                crafttype: crafttypeUpdated,
                projectslug: projectslugUpdated,
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
        } catch (error) {
            console.log(error);
        }
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
    getOtherUserInfo,
    addProjectToNotebook,
    deleteProject,
    updateProjectInDB,
    uploadPhoto,
    deletePhoto,
    uploadProfilePhoto,
    fetchUserInfo,
    fetchOtherUserInfo,
    linkToRaveler,
    checkUniqueProjectName,
    addInfoToProfile,
    getUserProfileInformation,
    addFriendDB,
    removeFriendDB,
    getFriends,
    getUserID,
    getProfilePic,
    searchUser,
    fetchCommunityMembers,
    getUserProfileImage,
};
