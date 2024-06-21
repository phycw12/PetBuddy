import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { db } from '../../firebase';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { ChatWrapper } from '../../styles/emotion';
import useAuthStore from '@/zustand/authStore'; // authStore 불러오기

export default function Chat() {
    const router = useRouter();
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
                querySnapshot.forEach((doc) => {
                    const chatRoomData = doc.data();
                    const participants = chatRoomData.participants;

                    // participants 배열 순회하여 사용자 uid와 일치하는 채팅방 필터링
                    participants.forEach(participant => {
                        if (participant.uid === user.uid) {
                            rooms.push({
                                id: doc.id,
                                createdAt: chatRoomData.createdAt,
                                participants: participants
                            });
                        }
                    });
                });

                // 찾은 채팅방 목록 설정
                setChatRooms(rooms);
            } catch (error) {
                console.error('Error fetching chat rooms:', error);
            }
        };

        fetchChatRooms();
    }, [user]); 

    const handleChatRoomClick = (roomId) => {
        router.push(`/chat/${roomId}`); // 해당 채팅방 페이지로 이동
    };

    return (
        <ChatWrapper>
            <h1>참여 중인 채팅방 목록</h1>
            <ul>
                {chatRooms.length > 0 ? (
                    chatRooms.map(room => (
                        <li key={room.id}>
                            <button onClick={() => handleChatRoomClick(room.id)}>
                                채팅방 ID: {room.id}
                            </button>
                        </li>
                    ))
                ) : (
                    <p>참여 중인 채팅방이 없습니다.</p>
                )}
            </ul>
        </ChatWrapper>
    );
};
