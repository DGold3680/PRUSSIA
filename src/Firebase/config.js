import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage, ref } from "firebase/storage";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBEcMuH2OOMFAhDrwqy22hh0Qabu7psXh4",
  authDomain: "fir-1-app-c043c.firebaseapp.com",
  projectId: "fir-1-app-c043c",
  storageBucket: "fir-1-app-c043c.appspot.com",
  messagingSenderId: "627959924084",
  appId: "1:627959924084:web:71be861781edeb65be9821",
};

initializeApp(firebaseConfig);

const firestoreDb = getFirestore();
const fireStorage = getStorage();
const auth = getAuth();

export { firestoreDb,fireStorage,ref,auth};
