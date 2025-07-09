import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,

  // apiKey: "AIzaSyC1A0vVLGUfU85bEcsUGfgYVQmwKhZUrL8",
  // authDomain: "assignment-12-9a9b7.firebaseapp.com",
  // projectId: "assignment-12-9a9b7",
  // storageBucket: "assignment-12-9a9b7.firebasestorage.app",
  // messagingSenderId: "778143024073",
  // appId: "1:778143024073:web:397cecca5fcfa44dee9e18",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);