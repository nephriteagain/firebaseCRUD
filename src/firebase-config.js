import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyC8kIM-L8eW_-2MlnUQuviMvc9PGuHlNkw",
  authDomain: "fir-tutorial-e55ba.firebaseapp.com",
  projectId: "fir-tutorial-e55ba",
  storageBucket: "fir-tutorial-e55ba.appspot.com",
  messagingSenderId: "42794447900",
  appId: "1:42794447900:web:ae2481e64c000b4522dbd9",
  measurementId: "G-FERTVHQ62P"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)