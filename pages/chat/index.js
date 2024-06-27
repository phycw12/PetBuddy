import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { db } from '../../firebase';
import { collection, query, getDocs, orderBy, limit } from 'firebase/firestore';
import { ChatWrapper, ChatList, ChatRoomList, ChatRoomItem, ChatRoomButton, ChatRoomDetails, ChatRoomName, ChatRoomDate, DivisionLine_2 } from '../../styles/emotion';
import useAuthStore from '@/zustand/authStore'; // authStore 불러오기
import Loading from '@/components/loading';

export default function Chat() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [chatRooms, setChatRooms] = useState([]);
    const { user } = useAuthStore(); // Zustand에서 user 정보 가져오기

    useEffect(() => {
        if (!user) return; // 사용자가 로그인하지 않은 경우 처리

        const fetchChatRooms = async () => {
            try {
                // Firestore에서 모든 채팅방 가져오기
                const q = query(collection(db, 'chatRooms'));
                const querySnapshot = await getDocs(q);

                // 사용자의 uid와 일치하는 채팅방 필터링
                const rooms = [];
                for (const doc of querySnapshot.docs) {
                    const chatRoomData = doc.data();
                    const participants = chatRoomData.participants;

                    const isParticipant = participants.some(participant => participant.uid === user.uid);
                    if (isParticipant) {
                        // 마지막 메시지의 날짜 가져오기
                        const messagesQuery = query(
                            collection(db, 'chatRooms', doc.id, 'messages'),
                            orderBy('timestamp', 'desc'),
                            limit(1)
                        );
                        const messagesSnapshot = await getDocs(messagesQuery);
                        let lastMessageDate = null;
                        if (!messagesSnapshot.empty) {
                            const lastMessage = messagesSnapshot.docs[0].data();
                            lastMessageDate = lastMessage.timestamp.toDate();
                        }

                        rooms.push({
                            id: doc.id,
                            createdAt: chatRoomData.createdAt,
                            participants: participants,
                            lastMessageDate: lastMessageDate
                        });
                    }
                }

                // 찾은 채팅방 목록 설정
                setChatRooms(rooms);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching chat rooms:', error);
                setLoading(true);
            }
        };

        fetchChatRooms();
    }, [user]);

    const handleChatRoomClick = (roomId) => {
        router.push(`/chat/${roomId}`); // 해당 채팅방 페이지로 이동
    };

    const formatDate = (date) => {
        if (!date) return '';
        const year = date.getFullYear().toString();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}년 ${month}월 ${day}일`;
    };

    if (loading) {
        return <Loading/>;
    };

    return (
        <ChatWrapper>
            <ChatList>참여 중인 채팅방 목록</ChatList>
            <ChatRoomList>
                {chatRooms.length > 0 ? (
                    chatRooms.map(room => {
                        const otherParticipant = room.participants.find(participant => participant.uid !== user.uid);
                        return (
                            <ChatRoomItem key={room.id}>
                                <ChatRoomButton onClick={() => handleChatRoomClick(room.id)}>
                                    <ChatRoomDetails>
                                        <ChatRoomName>{otherParticipant.nickname} 님과의 채팅방</ChatRoomName>
                                        <ChatRoomDate>마지막 메시지: {formatDate(room.lastMessageDate)}</ChatRoomDate>
                                    </ChatRoomDetails>
                                </ChatRoomButton>
                                <DivisionLine_2/>
                            </ChatRoomItem>
                        );
                    })
                ) : (
                    <div>참여 중인 채팅방이 없습니다.</div>
                )}
            </ChatRoomList>
        </ChatWrapper>
    );
}
