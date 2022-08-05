import { getDatabase, ref, get } from "firebase/database";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCibkQFaTV2Rqx8PcDmgxGesFtNiDwcp_w",
  authDomain: "nareshti-il.firebaseapp.com",
  databaseURL: "https://nareshti-il-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "nareshti-il",
  storageBucket: "nareshti-il.appspot.com",
  messagingSenderId: "891197741099",
  appId: "1:891197741099:web:1f6b86bbe58ba49c46b26e",
  measurementId: "G-PMZW9QPDVZ"
};

const firebase = initializeApp(firebaseConfig);


const db = ref(getDatabase());

const getAllData = async () => {
  return await get(db, 'books',)
}
const data = getAllData()

export default firebase
