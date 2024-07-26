import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithCredential,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth/cordova";
import { addDoc, collection, getFirestore } from "firebase/firestore/lite";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyB67zVGKx8xQ6gI0fsm9aLgLMeTBt7iQ6k",
  authDomain: "netflix-clone-ab641.firebaseapp.com",
  projectId: "netflix-clone-ab641",
  storageBucket: "netflix-clone-ab641.appspot.com",
  messagingSenderId: "908433259347",
  appId: "1:908433259347:web:cf4b9af343478a9f247fa6",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (name, email, password) => {
  try {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedName) {
      throw new Error("Name cannot be Empty");
    }

    const res = await createUserWithEmailAndPassword(
      auth,
      trimmedEmail,
      trimmedPassword
    );
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name: trimmedName,
      authProvider: "local",
      email: trimmedEmail,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const login = async (email, password) => {
  try {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    await signInWithEmailAndPassword(auth, trimmedEmail, trimmedPassword);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, login, signUp, logout };
