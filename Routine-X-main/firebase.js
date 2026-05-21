import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBgup--yR4hm7_aUxDC_8WQ6ajJIluQc0A",
  authDomain: "routinex-b036b.firebaseapp.com",
  projectId: "routinex-b036b",
  storageBucket: "routinex-b036b.firebasestorage.app",
  messagingSenderId: "519111122878",
  appId: "1:519111122878:web:93e4a47a75323cbb58a3ef",
  measurementId: "G-HV6NRSDM7X"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

console.log("Firebase conectado com sucesso");
