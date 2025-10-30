// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAOzPUY6BGbW9SxCEDhDLL0jjTRKBFtrpc",
  authDomain: "app-memories-9ccd8.firebaseapp.com",
  projectId: "app-memories-9ccd8",
  storageBucket: "app-memories-9ccd8.firebasestorage.app",
  messagingSenderId: "441254751185",
  appId: "1:441254751185:web:7826bc2202067d5d504ef0",
  measurementId: "G-0P3Q397TV7"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Funciones de autenticación
export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  const userData = {
    name: user.displayName,
    email: user.email,
    photo: user.photoURL,
  };
  localStorage.setItem("user", JSON.stringify(userData));
  return userData;
};

export const logout = async () => {
  await signOut(auth);
  localStorage.removeItem("user");
};

export { auth };
