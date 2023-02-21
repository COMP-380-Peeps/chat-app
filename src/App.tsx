import React from 'react';
import { AuthProvider, useAuth } from './components/Auth/AuthContext';
import ChatBox from "./components/ChatBox/ChatBox";

const App = () => {
    const { currentUser, signInWithGoogle, handleSignOut, isWhitelisted } = useAuth();

    return (
        <div>
            {currentUser && isWhitelisted ? (
                <>
                    <p>Welcome, {currentUser.displayName}!</p>
                    <ChatBox></ChatBox>
                    <button onClick={handleSignOut}>Sign Out</button>
                </>
            ) : (
                <button onClick={signInWithGoogle}>Sign in with Google</button>
            )}
        </div>
    );
};

export default () => (
    <AuthProvider>
        <App/>
    </AuthProvider>
);
