import React, {createContext, useContext, useEffect, useState} from 'react';
import {auth, googleAuthProvider, db} from '../Firebase/Firebase';
import {User, signInWithPopup, signOut} from 'firebase/auth';
import { collection, getDocs, setDoc, doc, getDoc, serverTimestamp } from 'firebase/firestore';

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProps {
    children: React.ReactNode
}

interface AuthContextType {
    currentUser: User | null;
    signInWithGoogle: () => Promise<void>;
    handleSignOut: () => Promise<void>;
    isWhitelisted: boolean;
}

const userExists = (user: User) => {
    const userRef = doc(db, 'users', user.uid);
    getDoc(userRef)
        .then((docSnapshot)=> {
            if (docSnapshot.exists()) {
                console.log("User exists already");
            } else {
                setDoc(userRef, {
                    uid: user.uid,
                    display_name: user.displayName,
                    email: user.email,
                    user_name: "",
                    timestamp: serverTimestamp(),
                })
                    .then(()=> {
                        console.log("New user added");
                    })
                    .catch((error) => {
                        console.error("Error creating user doc: ", error )
                    })
            }
        })
}

export function useAuth() {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return authContext;
}

export const AuthProvider = ({ children }: AuthProps) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isWhitelisted, setIsWhitelisted] = useState(false);

    useEffect(() => {
        return auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);

            if (user) {
                const whitelistRef = collection(db,'whitelisted_users');
                getDocs(whitelistRef).then((querySnapshot) => {
                    const test = querySnapshot.docs
                    console.log(test)
                    const isWhitelisted = querySnapshot.docs.some((doc) => doc.id === user.email);
                    setIsWhitelisted(isWhitelisted);
                    console.log(isWhitelisted)
                });
                userExists(user);
            } else {
                setIsWhitelisted(false);
            }
        });
    }, []);

    const signInWithGoogle = async () => {
        await signInWithPopup(auth, googleAuthProvider);
    };

    const handleSignOut = async () => {
        await signOut(auth);
    };

    const value: AuthContextType = {
        currentUser,
        isWhitelisted,
        signInWithGoogle,
        handleSignOut,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
