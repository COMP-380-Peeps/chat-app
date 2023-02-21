import React, {useEffect, useState} from 'react';
import {useAuth} from "../Auth/AuthContext";
import {where, onSnapshot, query, getDocs, collection} from "firebase/firestore";
import {db} from "../Firebase/Firebase";
interface Message {
    id: string;
    content: string;
    created_at: number;
}
// I'm thinking we use react-router-dom to get the serverId from useParams(), but feel free to think of other ideas
const serverId = "server_id_1";

const ChatBox = () => {
    const { currentUser, isWhitelisted } = useAuth();
    const [messages, setMessages] = useState<any[]>([]);
    console.log(currentUser, isWhitelisted)
    useEffect(() => {
        if (currentUser && isWhitelisted) {
            const serverRef = collection(db, "servers");
            const serverQuery = query(serverRef, where("__name__", "==", serverId));
            console.log(serverRef, serverQuery)
            getDocs(serverQuery)
                .then((serverSnapshot) => {
                    if (serverSnapshot.empty) {
                        console.log(`Server ${serverId} not found`);
                        return;
                    }
                    const serverDoc = serverSnapshot.docs[0];
                    const messagesIds = serverDoc.data().messages;

                    const messagesRef = collection(db, "server_messages");
                    const messagesQuery = query(messagesRef, where("__name__", "in", messagesIds));

                    const unsubscribeMessages = onSnapshot(messagesQuery, (querySnapshot) => {
                        const messagesData = querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        })) as Message[];
                        setMessages(messagesData.sort((a, b) => a.created_at - b.created_at));
                    })
                    return () => unsubscribeMessages();
                })
                .catch((error) => {
                    console.error("Error getting server: ", error);
                });
        }
    }, [currentUser, isWhitelisted])

    if (currentUser && isWhitelisted) {
        return (
            <ul>
                {messages.map((message) => (
                    <li key={message.id}>
                        <div>{message.created_at.toDate().toLocaleString()}</div>
                        <div>{message.content}</div>
                        <div> from: {message.sender_id}</div>
                    </li>
                ))}
            </ul>
        );
    } else {
        return null;
    }

};

export default ChatBox;