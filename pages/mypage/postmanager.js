import { useEffect, useState } from 'react';
import useAuthStore from '@/zustand/authStore';
import { db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { PostManagementWrapper, PostWritten, PostWrittenWrapper, DivisionLine, PostWrittenContainer, PostWrittenTitle, PostManagementDelete, PostManagementDate, CommentWritten, CommentWrittenWrapper, CommentWrittenContainer, CommentWrittenContent, CommentWrittenTitle } from '../../styles/emotion';

export default function PostManager() {
    const { user } = useAuthStore();
    const [userPosts, setUserPosts] = useState([]);
    const [userComments, setUserComments] = useState([]);

    useEffect(() => {
        const fetchUserPostsAndComments = async () => {
            if (user) {
                try {
                    const postsQuery = query(collection(db, 'posts'), where('authorId', '==', user.uid));
                    const postsSnapshot = await getDocs(postsQuery);
                    const posts = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setUserPosts(posts);
        
                    const commentsQuery = query(collection(db, 'comments'), where('authorId', '==', user.uid));
                    const commentsSnapshot = await getDocs(commentsQuery);
                    const comments = commentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setUserComments(comments);
                } catch (error) {
                    console.error('Error fetching user posts and comments: ', error);
                }
            }
        };
        fetchUserPostsAndComments();
    }, [user]);

    return (
        <PostManagementWrapper>
            <PostWritten>작성글-클릭하면 해당글로</PostWritten>
            {userPosts.length > 0 ? (
                userPosts.map(post => (
                    <PostWrittenWrapper key={post.id}>
                        <DivisionLine />
                        <PostWrittenContainer>
                            <PostWrittenTitle>{post.title}</PostWrittenTitle>
                            <PostManagementDelete>삭제</PostManagementDelete>
                        </PostWrittenContainer>
                        <PostManagementDate>
                            {new Intl.DateTimeFormat('ko-KR', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false,
                            }).format(post.createdAt.toDate())}
                        </PostManagementDate>
                    </PostWrittenWrapper>
                ))
            ) : (
                <p>작성된 글이 없습니다.</p>
            )}
            <CommentWritten>작성댓글-클릭하면 해당댓글로</CommentWritten>
            {userComments.length > 0 ? (
                userComments.map(comment => (
                    <CommentWrittenWrapper key={comment.id}>
                        <DivisionLine />
                        <CommentWrittenContainer>
                            <CommentWrittenContent>{comment.content}</CommentWrittenContent>
                            <PostManagementDelete>삭제</PostManagementDelete>
                        </CommentWrittenContainer>
                        <CommentWrittenTitle>{comment.postTitle}</CommentWrittenTitle>
                        <PostManagementDate>
                            {new Intl.DateTimeFormat('ko-KR', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false,
                            }).format(comment.createdAt.toDate())}
                            </PostManagementDate>
                    </CommentWrittenWrapper>
                ))
            ) : (
                <p>작성된 댓글이 없습니다.</p>
            )}
        </PostManagementWrapper>
    );
};