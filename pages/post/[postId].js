import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { db, auth } from '../firebase';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import ReactMarkdown from 'react-markdown';
import ContentLoader from 'react-content-loader';
import { PostIdContainer, PostIdHeader, PostIdTitle, MetaInfo,  PostIdContents, ActionButtons, PostIdButton } from '../../styles/emotion';

export default function Post() {
    const router = useRouter();
    const { postId } = router.query;
    const [post, setPost] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [userType, setUserType] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setCurrentUser(user);
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    setUserType(userDoc.data().userType);
                }
            } else {
                setCurrentUser(null);
                setUserType(null);
            }
        });

        return () => unsubscribe();
    }, []);

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

    const handleDelete = async () => {
        if (postId) {
            const confirmDelete = window.confirm('정말 삭제하시겠습니까?');
            if (confirmDelete) {
                const docRef = doc(db, 'posts', postId);
                await deleteDoc(docRef);
                alert('게시글이 삭제되었습니다.');
                router.push(`/board/${post.category}`); // 글이 있던 카테고리 페이지로 이동
            }
        }
    };

    const handleEdit = () => {
        router.push(`/write/${postId}`); // 글을 수정하는 페이지로 이동
    };

    const handleGoBack = () => {
        router.back(); // 이전 페이지로 돌아가기
    };

    // 컴포넌트 정의
    const components = {
        img: ({ src, alt }) => (
            <img src={src} alt={alt} style={{ maxWidth: '400px', maxHeight: '500px' }} />
        )
    };

    if (!post) {
        return (
            <PostIdContainer>
                <ContentLoader 
                    speed={2}
                    width={400}
                    height={160}
                    viewBox="0 0 400 160"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="0" y="10" rx="3" ry="3" width="300" height="30"/>
                    <rect x="0" y="50" rx="3" ry="3" width="250" height="20"/>
                    <rect x="0" y="80" rx="3" ry="3" width="200" height="20"/>
                    <rect x="0" y="110" rx="3" ry="3" width="350" height="50"/>
                </ContentLoader>
            </PostIdContainer>
        );
    }

    return (
        <PostIdContainer>
            
            <PostIdTitle>제목 : {post.title}</PostIdTitle>
            
            
            {currentUser && (currentUser.uid === post.authorId || userType === 0) && (
                <ActionButtons>
                    <PostIdButton onClick={handleEdit}>수정</PostIdButton>
                    <PostIdButton onClick={handleDelete}>삭제</PostIdButton>
                </ActionButtons>
            )}
            <PostIdButton onClick={handleGoBack}>뒤로가기</PostIdButton>
            <MetaInfo>
                <span>카테고리 : {post.category}</span>
                <span>작성자 : {post.authorNickname}</span>
                <span>조회수 : {post.views+1}</span>
                <span>
                작성일 : 
                {new Intl.DateTimeFormat('ko-KR', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: false,
                                    }).format(post.createdAt.toDate())}
                </span>
            </MetaInfo>
            <PostIdContents>
                <ReactMarkdown components={components}>{post.content.replace(/\n/g, '  \n')}</ReactMarkdown>
            </PostIdContents>
        </PostIdContainer>
    );
};
