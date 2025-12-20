import { 
    createUserWithEmailAndPassword, 
    GoogleAuthProvider, 
    onAuthStateChanged, 
    sendPasswordResetEmail, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    signOut, 
    updateProfile 
} from "firebase/auth";
import { useEffect, useState } from "react";
import auth from "../firebase/firebase.init";
import { AuthContext } from "./AuthContext";
import Spinner from "../Components/Spinner";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const providerGoogle = new GoogleAuthProvider()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (curUser) => {
            setUser(curUser)
            setLoading(false)
        })
        return () => unsubscribe()
    }, [])

    const signup = async (email, password, name, photoUrl) => {
        const userCred = await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(userCred.user, {
            displayName: name,
            photoURL: photoUrl
        })
        return userCred
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    const loginWithGoogle = () => {
        return signInWithPopup(auth, providerGoogle)
    }

    const logout = () => {
        return signOut(auth)
    }

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    const updateUserProfile = async (updateInfo) => {
        return updateProfile(auth.currentUser, updateInfo)
    }

    const contextValue = {
        user,
        loading,
        signup,
        login,
        loginWithGoogle,
        logout,
        resetPassword,
        updateUserProfile,
        isAuthenticated: !!user
    }
    
    return (
        <AuthContext value={contextValue}>
            {loading ? <Spinner /> : children}
        </AuthContext>
    );
};