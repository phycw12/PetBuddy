import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { collection, query, onSnapshot, addDoc, orderBy, doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import { ChatRoomWrapper, MessageListWrapper, MessageBubble, MessageSender, MessageTimestamp, MessageInputWrapper, MessageInput, SendMessageButton } from '../../styles/emotion';

export default function ChatId() {
    const router = useRouter();
    const { chatId } = router.query;
    const [messages, setMessages] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [newMessage, setNewMessage] = useState('');

    const messagesEndRef = useRef(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                setCurrentUser(user);
            } else {
                setCurrentUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!chatId) return; // chatId가 없으면 실행하지 않음

        console.log("db:", db);
        console.log("chatId:", chatId);
        const q = query(collection(db, 'chatRooms', chatId, 'messages'), orderBy('timestamp', 'asc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const messagesData = snapshot.docs.map((doc) => doc.data());
            setMessages(messagesData);
            scrollToBottom();
        });
        return () => unsubscribe();
    }, [chatId]);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        let currentUserNickname = currentUser.displayName;

        if (userDoc.exists()) {
            const userData = userDoc.data();
            currentUserNickname = userData.nickname;
        }

        const messageData = {
            content: newMessage,
            senderId: currentUser.uid,
            senderEmail: currentUser.email,
            senderNickname: currentUserNickname,
            timestamp: new Date(),
        };

        try {
            if (!chatId) {
                console.error('chatId is undefined');
                return;
            }

            const messagesCollectionRef = collection(db, 'chatRooms', chatId, 'messages');
            await addDoc(messagesCollectionRef, messageData);

            setNewMessage('');
            scrollToBottom();
        } catch (error) {
            console.error('Error sending message: ', error);
        }
    };

    if (!chatId) {
        return <div>Loading...</div>; // chatId가 없을 때 로딩 상태를 표시
    }
    
    return (
        <ChatRoomWrapper>
            <MessageListWrapper style={{ maxHeight: '70vh', overflowY: 'scroll' }}>
                {messages.map((message, index) => (
                    <MessageBubble key={index} isSelf={message.senderId === currentUser?.uid}>
                        <MessageSender>{message.senderNickname}</MessageSender>
                        <p>{message.content}</p>
                        <MessageTimestamp>
                            {new Date(message.timestamp?.toDate()).toLocaleString()}
                        </MessageTimestamp>
                    </MessageBubble>
                ))}
                <div ref={messagesEndRef}></div>
            </MessageListWrapper>
            <MessageInputWrapper onSubmit={handleSendMessage}>
                <MessageInput
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="메시지를 입력하세요..."
                />
                <SendMessageButton type="submit">보내기</SendMessageButton>
            </MessageInputWrapper>
        </ChatRoomWrapper>
    );
};
