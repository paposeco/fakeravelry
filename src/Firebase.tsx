import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
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
} from "firebase/auth";

import type { Needles, Hooks, Yarn } from "./components/common/types";

const firebaseConfig = {
  apiKey: "AIzaSyA1i11bP3s4ppzKH2MYBEkdjIlt8yW-KeU",
  authDomain: "fakeravelry.firebaseapp.com",
  projectId: "fakeravelry",
  storageBucket: "fakeravelry.appspot.com",
  messagingSenderId: "923124924710",
  appId: "1:923124924710:web:b5395ff184a0068070c1e7",
};

const startDB = function () {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  return db;
};

const database = startDB();
let auth = getAuth();

const uploadPhoto = async function (projectid: string, file: File) {
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

const createUser = function (
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

const startEmptyProfile = async function (
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

const signIn = async function (email: string, password: string) {
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

const signOutUser = async function () {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
};

const getInfo = async function (infotofetch: string) {
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

const addProjectToNotebook = async function (
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
          numberStsOrRepeats: null,
          horizontalunits: "stitches",
          numberRows: null,
          gaugesize: "",
        },
        gaugepattern: "",
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

// need to get all the info to update the arrays.
// maybe each project should have its own yarn subcollection

const updateProjectInDB = async function (
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
        },
        gaugepattern: gaugepatternUpdated,
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

//storage
//email authentication

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
};
