import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import ReactMarkdown from 'react-markdown';

export default function Post() {
    const router = useRouter();
    const { postId } = router.query;
    const [post, setPost] = useState(null);

    useEffect(() => {
        async function fetchPost() {
            if (postId) {
                const docRef = doc(db, 'posts', postId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const postData = docSnap.data();
                    setPost(postData);
                    // 조회수 증가 처리
                    await updateDoc(docRef, {
                        views: postData.views + 1
                    });
                } else {
                    console.log('No such document!');
                }
            }
        }
        fetchPost();
    }, [postId]);

    if (!post) {
        return <div>Loading...</div>;
    };

    return (
        <div>
            <div>카테고리: {post.category}</div>
            <div>제목: {post.title}</div>
            <div>날짜: {post.createdAt.toDate().toString()}</div>
            <div>닉네임: {post.authorNickname}</div>
            <ReactMarkdown>{post.content}</ReactMarkdown>
            <div>조회수: {post.views+1}</div>
        </div>
    );
};
