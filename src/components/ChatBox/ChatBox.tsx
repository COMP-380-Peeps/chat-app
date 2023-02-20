import React, {useEffect, useState} from 'react';
import {useAuth} from "../Auth/AuthContext";
import {getFirestore, collectionGroup, where, orderBy, query, getDocs, collection, getDoc, doc} from "firebase/firestore";
import {db} from "../Firebase/Firebase";
import firebase from "firebase/compat";

// I'm thinking we use react-router-dom to get the serverId from useParams(), but feel free to think of other ideas
const serverId = "server_id_1";

const ChatBox = () => {
    const { currentUser, isWhitelisted } = useAuth();
    const [messages, setMessages] = useState<any[]>([]);
    useEffect(() => {
        if (currentUser && isWhitelisted) {
            const conversationsRef = collection(db, "conversations");
            const conversationsQuery = query(conversationsRef, where("server_id", "==", serverId));

            getDocs(conversationsQuery)
                .then(async (querySnapshot) => {
                    const conversationsData = querySnapshot.docs.map((doc) => doc.data());
                    const messagesArrays = conversationsData.map((conversationData) => conversationData.messages);
                    const flatMessagesArray = messagesArrays.reduce((acc, val) => acc.concat(val), []);
                    const messagesRef = collection(db, "server_messages");
                    const messagesData = [];

                    for (const id of flatMessagesArray) {
                        const docRef = doc(messagesRef, id);
                        const docSnapshot = await getDoc(docRef);
                        if (docSnapshot.exists()) {
                            messagesData.push({
                                id: docSnapshot.id,
                                created_at: docSnapshot.data().created_at,
                                ...docSnapshot.data()});
                        }
                    }
                    setMessages(messagesData.sort((a,b) => a.created_at - b.created_at));
                })
                .catch((error) => {
                    console.error("Error getting messages: ", error);
                });
        }
    }, [serverId, currentUser, db])

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