import { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import useAuthStore from '@/zustand/authStore';
import { InquiryWrapper, InquiryList } from '../../styles/emotion';

export default function Inquiry() {
    const { user } = useAuthStore();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [inquiries, setInquiries] = useState([]);

    useEffect(() => {
        if (user) {
            fetchInquiries();
        }
    }, [user]);

    const fetchInquiries = async () => {
        try {
            const inquiriesRef = collection(db, 'inquiries');
            const q = query(inquiriesRef, where('authorId', '==', user.uid));
            const querySnapshot = await getDocs(q);

            let fetchedInquiries = [];
            querySnapshot.forEach((doc) => {
                const inquiry = {
                    id: doc.id,
                    ...doc.data(),
                };
                fetchedInquiries.push(inquiry);
            });

            setInquiries(fetchedInquiries);
        } catch (error) {
            console.error('Error fetching inquiries:', error);
        }
    };

    const handleInquiry = async () => {
        try {
            const inquiriesRef = collection(db, 'inquiries');
            await addDoc(inquiriesRef, {
                authorId: user.uid,
                createdAt: serverTimestamp(),
                title,
                content,
                answered: false,
            });
            alert('문의가 성공적으로 전송되었습니다.');
            setTitle('');
            setContent('');
            fetchInquiries(); // 문의가 추가된 후 목록을 다시 불러옴
        } catch (error) {
            console.error('Error sending inquiry:', error);
            alert('문의 전송에 실패하였습니다.');
        }
    };

    return (
        <InquiryWrapper>
            <h1>문의 게시판</h1>
            <label>문의 제목:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            <br />
            <label>문의 내용:</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} />
            <br />
            <button onClick={handleInquiry}>문의하기</button>

            <h2>나의 문의글 목록</h2>
            <InquiryList>
                {inquiries.length > 0 ? (
                    inquiries.map((inquiry) => (
                        <div key={inquiry.id}>
                            <div>제목: {inquiry.title}</div>
                            <div>내용: {inquiry.content}</div>
                            <div>{inquiry.answered ? '답변 완료' : '답변 대기 중'}</div>
                        </div>
                    ))
                ) : (
                    <div>작성한 문의글이 없습니다.</div>
                )}
            </InquiryList>
        </InquiryWrapper>
    );
};
