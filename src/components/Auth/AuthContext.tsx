import React, {createContext, useContext, useEffect, useState} from 'react';
import {auth, googleAuthProvider, db} from '../Firebase/Firebase';
import {User, signInWithPopup, signOut} from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProps {
    children: React.ReactNode
}

interface AuthContextType {
    currentUser: User | null;
    signInWithGoogle: () => Promise<void>;
    isWhitelisted: boolean;
}

export function useAuth() {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return authContext;
}

export const handleSignOut = async () => {
    await signOut(auth);
};

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
                    const isWhitelisted = querySnapshot.docs.some((doc) => doc.data().email === user.email);
                    setIsWhitelisted(isWhitelisted);
                });
            } else {
                setIsWhitelisted(false);
            }
        });
    }, []);

    const signInWithGoogle = async () => {
        await signInWithPopup(auth, googleAuthProvider);
    };

    const value: AuthContextType = {
        currentUser,
        signInWithGoogle,
        isWhitelisted
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
