import { useState } from 'react';
import firebase from 'firebase/compat/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, User, signOut } from 'firebase/auth';
import firebase_config from "../Firebase/Firebase";

const auth = getAuth(firebase_config);

const SignInWithGoogle: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);

    const signInWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            setUser(user);
        } catch (error) {
            setError((error as firebase.auth.AuthError).message);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            setError((error as firebase.auth.AuthError).message);
        }
    };

    return (
        <div>
            {error && <div>{error}</div>}
            {user ? (
                <div>
                    <p>Welcome, {user.displayName}!</p>
                    <button onClick={handleSignOut}>Sign out</button>
                </div>
            ) : (
                <button onClick={signInWithGoogle}>Sign in with Google</button>
            )}
        </div>
    );
};

export default SignInWithGoogle;
