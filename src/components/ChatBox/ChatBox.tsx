import React from 'react';
import {useAuth} from "../Auth/AuthContext";

const ChatBox = () => {
    const { currentUser, isWhitelisted } = useAuth();

    if (currentUser && isWhitelisted) {
        return (
        <div>
            👉chat box placeholder👈
        </div>
        );
    } else {
        return null;
    }

};

export default ChatBox;