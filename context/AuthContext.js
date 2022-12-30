import { createContext, useContext, useEffect, useState} from "react";
import { auth, db } from "../firebase/firebase";
import { doc, setDoc } from 'firebase/firestore';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";



const AuthContext = createContext();

export function AuthContextProvider({children}) {
    const [user, setUser] = useState({});

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
    }
    
    function signUp(email, password) {
        createUserWithEmailAndPassword(auth, email, password)
        return setDoc(doc(db, 'users', email), {
            watchList: [],
          });
    }

    function signOut() {
        return signOut(auth)
    }

    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return () => {
            unsubscribe();
        }
    }, [])

    return (
        <AuthContext.Provider value={{signUp, logIn, user, googleSignIn, signOut }}>
            { children }
        </AuthContext.Provider>
    )
}

export function UserAuth() {
    return useContext(AuthContext)
}