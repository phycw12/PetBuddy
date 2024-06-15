import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { db, auth } from '../firebase';
import { doc, getDoc, updateDoc, deleteDoc, collection, addDoc, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import ReactMarkdown from 'react-markdown';
import {
    PostIdContainer,
    PostIdTitle,
    MetaInfo,
    PostIdContents,
    ActionButtons,
    PostIdButton,
    CommentsContainer,
    Comment,
    CommentHeader,
    CommentBody,
    CommentActions,
    CommentInputContainer,
    CommentInput,
    CommentSubmitButton
} from '../../styles/emotion';

export default function Post() {
    const router = useRouter();
    const { postId } = router.query;
    const [post, setPost] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [userType, setUserType] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);

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

    useEffect(() => {
        if (postId) {
            const q = query(collection(db, 'comments'), where('postId', '==', postId), orderBy('createdAt', 'asc'));
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const commentsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data(), editMode: false }));
                setComments(commentsData);
            });
            return () => unsubscribe();
        }
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

    const handleCommentSubmit = async () => {
        if (!newComment.trim()) {
            alert('댓글을 입력해주세요.');
            return;
        }
        try {
            // Firestore에서 사용자 닉네임 가져오기
            const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
            if (!userDoc.exists()) {
                throw new Error('User document not found');
            }
            const userData = userDoc.data();
            // 댓글 데이터 구성
            const commentData = {
                postId: postId,
                authorId: currentUser.uid,
                authorName: userData.nickname, // 사용자의 닉네임 가져오기
                content: newComment,
                createdAt: new Date()
            };
            // Firestore에 댓글 추가
            const commentRef = await addDoc(collection(db, 'comments'), commentData);
            console.log('댓글이 성공적으로 작성되었습니다.', commentRef.id);
            // 댓글 작성 후 필요한 작업 추가
            setNewComment(''); // 댓글 입력 필드 초기화
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };

    const handleCommentEditToggle = (commentId) => {
    setComments((prevComments) =>
        prevComments.map((comment) =>
            comment.id === commentId
                ? {
                      ...comment,
                      editMode: !comment.editMode,
                      newContent: comment.editMode ? '' : comment.content // Reset newContent if toggling back to false
                  }
                : comment
        )
    );
};

    const handleCommentEdit = async (commentId, newContent) => {
        try {
            const commentRef = doc(db, 'comments', commentId);
            await updateDoc(commentRef, {
                content: newContent,
                editedAt: new Date()
            });
            setComments((prevComments) =>
                prevComments.map((comment) =>
                    comment.id === commentId ? { ...comment, editMode: false, content: newContent } : comment
                )
            );
            console.log('댓글이 성공적으로 수정되었습니다.');
            // 수정 후 필요한 작업 추가
        } catch (error) {
            console.error('Error updating document: ', error);
        }
    };

    const handleCommentDelete = async (commentId) => {
        try {
            const confirmDelete = window.confirm('정말 삭제하시겠습니까?');
            if (confirmDelete) {
                const commentRef = doc(db, 'comments', commentId);
                await deleteDoc(commentRef);
                console.log('댓글이 성공적으로 삭제되었습니다.');
                // 삭제 후 필요한 작업 추가
            }
        } catch (error) {
            console.error('Error deleting document: ', error);
        }
    };

    // 컴포넌트 정의
    const components = {
        img: ({ src, alt }) => (
            <img src={src} alt={alt} style={{ maxWidth: '400px', maxHeight: '500px' }} />
        )
    };

    if (!post) {
        return <div>Loading...</div>;
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
                <span>조회수 : {post.views + 1}</span>
                <span>
                작성일 :{' '}
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
            <CommentsContainer>
                <CommentInputContainer>
                    <CommentInput
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="댓글을 작성하세요..."
                    />
                    <CommentSubmitButton onClick={handleCommentSubmit}>작성</CommentSubmitButton>
                </CommentInputContainer>
                {comments.map((comment) => (
                <Comment key={comment.id}>
                <CommentHeader>
                    {/* 프로필 사진 등 */}
                    <div>
                        <span>{comment.authorName}</span>
                        <span>
                            {new Intl.DateTimeFormat('ko-KR', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false,
                            }).format(comment.createdAt.toDate())}
                        </span>
                    </div>
                </CommentHeader>
                {comment.editMode ? (
                    <CommentBody>
                        {currentUser && currentUser.uid === comment.authorId && (
                            <div>
                                <textarea
                                    value={comment.newContent}
                                    onChange={(e) =>
                                        setComments((prevComments) =>
                                            prevComments.map((prevComment) =>
                                                prevComment.id === comment.id
                                                    ? { ...prevComment, newContent: e.target.value }
                                                    : prevComment
                                            )
                                        )
                                    }
                                    rows={3}
                                />
                                <div>
                                    <button onClick={() => handleCommentEditToggle(comment.id)}>수정</button>
                                </div>
                            </div>
                        )}
                    </CommentBody>
                ) : (
                    <CommentBody>{comment.content}</CommentBody>
                )}
                <CommentActions>
                    {/* 수정 및 삭제 버튼 */}
                    {currentUser && (currentUser.uid === comment.authorId || userType === 0) && (
                        <>
                            <button onClick={() => handleCommentEditToggle(comment.id)}>수정</button>
                            <button onClick={() => handleCommentDelete(comment.id)}>삭제</button>
                        </>
                    )}
                </CommentActions>
            </Comment>
            ))}
            </CommentsContainer>
        </PostIdContainer>
    );
};
