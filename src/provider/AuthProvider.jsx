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
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getElement } from "../utils/utility";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [darkLight, setDarkLight] = useState(null);

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
    return signOut(auth);
  };

  useEffect(() => {
    const unSubsCribe = onAuthStateChanged(auth, async (currenUser) => {
      if (currenUser) {
        setUser(currenUser);
        setLoading(false);
        await axios.post(
          `${import.meta.env.VITE_API_URL}/jwt`,
          { email: currenUser?.email },
          {
            withCredentials: true,
          }
        );
      } else {
        setLoading(false);
      }
    });

    return () => {
      return unSubsCribe();
    };
  }, [user]);

  useEffect(() => {
    const lit = getElement();
    setDarkLight(lit);
  }, [darkLight]);

  const { data: roleData, isLoading: roleLoading } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !!user?.email, // ensures query only runs when email exists
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/user-role?email=${user?.email}`
      );
      return res.data;
    },
  });

  const info = {
    user,
    setUser,
    loading,
    signUp,
    signIn,
    googleLogin,
    facebookLogin,
    logOut,
    role: roleData,
    roleLoading,
    darkLight,
    setDarkLight,
  };

  return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
