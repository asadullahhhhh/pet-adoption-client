
import { createUserWithEmailAndPassword, FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { createContext } from 'react';
import { auth } from '../firebase/firebase.config';

export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {

    const gProvider = new GoogleAuthProvider()
    const fProvider = new FacebookAuthProvider()

    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const googleLogin = () => {
        return signInWithPopup(auth, gProvider)
    }

    const facebookLogin = () => {
        return signInWithPopup(auth, fProvider)
    }

    const info = {
      signUp,
      googleLogin,
      facebookLogin,
    };

    return <AuthContext.Provider value={info}>
        {
            children
        }
    </AuthContext.Provider>
};

export default AuthProvider;