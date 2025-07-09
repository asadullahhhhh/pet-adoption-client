
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { createContext } from 'react';
import { auth } from '../firebase/firebase.config';

export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {

    const provider = new GoogleAuthProvider()

    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const googleLogin = () => {
        return signInWithPopup(auth, provider)
    }

    const info = {
      signUp,
      googleLogin,
    };

    return <AuthContext.Provider value={info}>
        {
            children
        }
    </AuthContext.Provider>
};

export default AuthProvider;