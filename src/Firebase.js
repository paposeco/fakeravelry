import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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

//storage
//email authentication

export default startDB;
