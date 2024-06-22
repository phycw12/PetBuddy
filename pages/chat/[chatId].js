import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { collection, query, onSnapshot, addDoc, orderBy, doc, getDoc } from 'firebase/firestore';
import { db, auth, storage } from '../../firebase';
import { ref, getDownloadURL } from 'firebase/storage';
import { ChatRoomWrapper, MessageListWrapper, MessageWrapper, MessageContent, SenderInfo, MessageTimestamp, MessageInputWrapper, MessageInput, SendMessageButton, DateSeparator } from '../../styles/emotion';
import ReactMarkdown from 'react-markdown';

const defaultImageRef = ref(storage, '/petbuddy/profile.svg');

export default function ChatId() {
    const router = useRouter();
    const { chatId } = router.query;
    const [messages, setMessages] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [profileImageURL, setProfileImageURL] = useState('');
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
        if (!currentUser) return;

        const fetchProfileImage = async () => {
            const userDoc = await getDoc(doc(db, 'users', currentUser.uid));

            if (userDoc.exists()) {
                const userData = userDoc.data();
                if (userData.profileImg) {
                    setProfileImageURL(userData.profileImg);
                } else {
                    // 프로필 이미지가 없을 경우 기본 이미지 가져오기
                    try {
                        const defaultImageURL = await getDownloadURL(defaultImageRef);
                        setProfileImageURL(defaultImageURL);
                    } catch (error) {
                        console.error('Error fetching default profile image: ', error);
                    }
                }
            }
        };

        fetchProfileImage();
    }, [currentUser]);

    useEffect(() => {
        if (!chatId) return; // chatId가 없으면 실행하지 않음

        const q = query(collection(db, 'chatRooms', chatId, 'messages'), orderBy('timestamp', 'asc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const messagesData = snapshot.docs.map((doc) => doc.data());
            setMessages(messagesData);
            scrollToBottom();
        });

        return () => unsubscribe();
    }, [chatId]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

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
        let currentUserProfileImg = profileImageURL; // 기본 이미지 URL 설정

        if (userDoc.exists()) {
            const userData = userDoc.data();
            currentUserNickname = userData.nickname;
            currentUserProfileImg = userData.profileImg || profileImageURL; // 프로필 이미지가 없으면 기본 이미지 URL 사용
        }

        const messageData = {
            content: newMessage,
            senderId: currentUser.uid,
            senderEmail: currentUser.email,
            senderNickname: currentUserNickname,
            senderProfileImg: currentUserProfileImg,
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

    const formatToday = (timestamp) => {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        const year = date.getFullYear().toString(); // 년도 4자리
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월을 2자리로
        const day = date.getDate().toString().padStart(2, '0'); // 일을 2자리로
        return `${year}년 ${month}월 ${day}일`;
    };

    const formatTime = (timestamp) => {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        const hours = date.getHours().toString().padStart(2, '0'); // 시간을 2자리로
        const minutes = date.getMinutes().toString().padStart(2, '0'); // 분을 2자리로
        return `${hours}:${minutes}`;
    };

    const components = {
        img: ({ src, alt }) => <img src={src} alt={alt} style={{ maxWidth: '50px', maxHeight: '50px', borderRadius: '50%', marginTop: '-20px' }} />
    };

    if (!chatId) {
        return <div>Loading...</div>; // chatId가 없을 때 로딩 상태를 표시
    }

    let previousDate = '';

    return (
        <ChatRoomWrapper>
        <MessageListWrapper>
            {messages.map((message, index) => {
                const messageDate = formatToday(message.timestamp?.toDate());
                const showDate = messageDate !== previousDate;
                previousDate = messageDate;
                const isSelf = message.senderId === currentUser?.uid;

                return (
                    <div key={index}>
                        {showDate && (
                            <DateSeparator>
                                {messageDate}
                            </DateSeparator>
                        )}

                        {isSelf ? (
                            <MessageWrapper isSelf>
                                <MessageTimestamp isSelf>
                                    {formatTime(message.timestamp?.toDate())}
                                </MessageTimestamp>
                                <MessageContent>
                                    <p>{message.content}</p>
                                </MessageContent>
                            </MessageWrapper>
                        ) : (
                            <MessageWrapper>
                                <SenderInfo>
                                    <ReactMarkdown components={components}>
                                        {`![Profile Image](${message.senderProfileImg || profileImageURL})`}
                                    </ReactMarkdown>
                                </SenderInfo>
                                <MessageContent>
                                    <p>{message.content}</p>
                                </MessageContent>
                                <MessageTimestamp>
                                    {formatTime(message.timestamp?.toDate())}
                                </MessageTimestamp>
                            </MessageWrapper>
                        )}
                    </div>
                );
            })}
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
