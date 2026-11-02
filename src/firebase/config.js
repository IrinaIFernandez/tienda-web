import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuración de la app web Aldu Accesorios en el proyecto nuevo.
const firebaseConfig = {
  apiKey: "AIzaSyCYcuMqvxuxaLTUPMTRMxhu3fGtwdUsd-0",
  authDomain: "aldu-accesorios-b45dd.firebaseapp.com",
  projectId: "aldu-accesorios-b45dd",
  storageBucket: "aldu-accesorios-b45dd.firebasestorage.app",
  messagingSenderId: "94177338498",
  appId: "1:94177338498:web:f92c9f62426dafe728009b",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
