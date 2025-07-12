import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const gProvider = new GoogleAuthProvider();
  const fProvider = new FacebookAuthProvider();

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = () => {
    return signInWithPopup(auth, gProvider);
  };

  const facebookLogin = () => {
    return signInWithPopup(auth, fProvider);
  };

  const logOut = () => {
    return signOut(auth)
  }

  useEffect(() => {
    const unSubsCribe = onAuthStateChanged(auth, currenUser => {
        if(currenUser){
          setUser(currenUser);
          setLoading(false);
        }else{
          setLoading(false)
        }
    });

    return () => {
        return unSubsCribe()
    }
  }, []);

  const info = {
    user,
    loading,
    signUp,
    signIn,
    googleLogin,
    facebookLogin,
    logOut,
  };

  return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
