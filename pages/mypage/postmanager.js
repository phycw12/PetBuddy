import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useAuthStore from '@/zustand/authStore';
import { db } from '../../firebase';
import { doc, collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { PostManagementWrapper, PostWritten, PostWrittenWrapper, DivisionLine2, PostWrittenContainer, PostWrittenTitle, PostManagementDelete, PostManagementDate, CommentWritten, CommentWrittenWrapper, CommentWrittenContainer, CommentWrittenContent, CommentWrittenTitle } from '../../styles/emotion';

export default function PostManager() {
    const router = useRouter();
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

    const handleDelete = async (postId) => {
        if (postId) {
            const confirmDelete = window.confirm('정말 삭제하시겠습니까?');
            if (confirmDelete) {
                try {
                    // 게시글 참조
                    const postRef = doc(db, 'posts', postId);
    
                    // 댓글들 참조 및 삭제
                    const commentsQuery = query(collection(db, 'comments'), where('postId', '==', postId));
                    const commentsSnapshot = await getDocs(commentsQuery);
    
                    // 댓글들 삭제
                    const deletePromises = commentsSnapshot.docs.map((commentDoc) => deleteDoc(commentDoc.ref));
                    await Promise.all(deletePromises);
    
                    // 게시글 삭제
                    await deleteDoc(postRef);
    
                    alert('게시글과 댓글이 삭제되었습니다.');
                    router.reload();
                } catch (error) {
                    console.error('Error deleting document: ', error);
                }
            }
        }
    };
    
    const handleCommentDelete = async (commentId) => {
        try {
            const confirmDelete = window.confirm('정말 삭제하시겠습니까?');
            if (confirmDelete) {
                const commentRef = doc(db, 'comments', commentId);
                await deleteDoc(commentRef);
                console.log('댓글이 성공적으로 삭제되었습니다.');
                router.reload();
            }
        } catch (error) {
            console.error('Error deleting document: ', error);
        }
    };

    const handleClick = (postId) => {
        router.push(`/post/${postId}`);
    };

    return (
        <PostManagementWrapper>
            <PostWritten>작성글</PostWritten>
            {userPosts.length > 0 ? (
                userPosts.map(post => (
                    <PostWrittenWrapper key={post.id}>
                        <DivisionLine2/>
                        <PostWrittenContainer>
                            <PostWrittenTitle onClick={() => handleClick(post.id)}>{post.title}</PostWrittenTitle>
                            <PostManagementDelete onClick={() => handleDelete(post.id)}>삭제</PostManagementDelete>
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
            <CommentWritten>작성댓글</CommentWritten>
            {userComments.length > 0 ? (
                userComments.map(comment => (
                    <CommentWrittenWrapper key={comment.id}>
                        <DivisionLine2/>
                        <CommentWrittenContainer>
                            <CommentWrittenContent onClick={() => handleClick(comment.postId)}>{comment.content}</CommentWrittenContent>
                            <PostManagementDelete onClick={() => handleCommentDelete(comment.id)}>삭제</PostManagementDelete>
                        </CommentWrittenContainer>
                        <CommentWrittenTitle onClick={() => handleClick(comment.postId)}>{comment.postTitle}</CommentWrittenTitle>
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