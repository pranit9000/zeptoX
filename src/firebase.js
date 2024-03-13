// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBympFkSZoURnaUPFehHMFBIEppN8Ba3E4",
  authDomain: "zeptox-d3757.firebaseapp.com",
  projectId: "zeptox-d3757",
  storageBucket: "zeptox-d3757.appspot.com",
  messagingSenderId: "1015447088653",
  appId: "1:1015447088653:web:e2dc9d9389090e4666ef44",
  measurementId: "G-51P69XGHJ2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
