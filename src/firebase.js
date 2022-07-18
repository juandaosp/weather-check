import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

import {
  getFirestore,
  collection,
  addDoc
} from "firebase/firestore";

import translations from "./constants/errors";

const firebaseConfig = {
  apiKey: "AIzaSyCWJZF7_PAxJXNvLrWOfOeqAbWCZHBklFs",
  authDomain: "my-weather-56d05.firebaseapp.com",
  projectId: "my-weather-56d05",
  storageBucket: "my-weather-56d05.appspot.com",
  messagingSenderId: "141742500677",
  appId: "1:141742500677:web:0d72ca8346736753382c2c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const translateError = (errorCode) => {
  const translation =  translations[errorCode];
  if (!translation) return translations['else']
  return translation;
}

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    return err.code;
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    return {error: false, message:  'success'};
  } catch (err) {
    return {
      error: true,
      message: translateError(err.code)
    };
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    return {
      error: true,
      message: translateError(err.code)
    };
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};