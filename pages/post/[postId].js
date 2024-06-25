import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { db, auth, storage } from '../../firebase';
import { doc, getDoc, collection, addDoc, updateDoc, deleteDoc, query, where, getDocs, onSnapshot, orderBy } from 'firebase/firestore';
import { ref, deleteObject } from "firebase/storage";
import ReactMarkdown from 'react-markdown';
import { PostIdContainer, PostIdTitle, MetaInfo, PostIdContents, ActionButtons, PostIdButton, CommentsContainer, Comment, CommentHeader, CommentBody, CommentActions, CommentInputContainer, CommentInput, CommentSubmitButton, CommentEditBtn, ChatButton } from '../../styles/emotion';

export default function Post() {
    const router = useRouter();
    const { postId } = router.query;
    const [post, setPost] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [userType, setUserType] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
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
                        views: postData.views + 1,
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
                const postRef = doc(db, 'posts', postId);
                const postSnapshot = await getDoc(postRef);
                if (postSnapshot.exists()) {
                    const postData = postSnapshot.data();
                    const content = postData.content; // 게시글의 내용과 이미지 링크가 포함된 content 필드

                    // 이미지 링크 추출 (가정: 이미지 링크가 특정 형식을 따름)
                    const imageUrls = extractImageUrls(content); // content에서 이미지 링크를 추출하는 함수

                    // 이미지 삭제
                    const deleteImagePromises = imageUrls.map((imageUrl) => {
                        const imageRef = ref(storage, imageUrl);
                        return deleteObject(imageRef);
                    });
                    await Promise.all(deleteImagePromises);

                    // 댓글들 참조 및 삭제
                    const commentsQuery = query(collection(db, 'comments'), where('postId', '==', postId));
                    const commentsSnapshot = await getDocs(commentsQuery);

                    // 댓글들 삭제
                    const deleteCommentPromises = commentsSnapshot.docs.map((commentDoc) => deleteDoc(commentDoc.ref));
                    await Promise.all(deleteCommentPromises);

                    // 게시글 삭제
                    await deleteDoc(postRef);

                    alert('게시글과 댓글이 삭제되었습니다.');
                    router.back();
                } else {
                    alert('게시글을 찾을 수 없습니다.');
                }
            }
        }
    };

    const handleEdit = () => {
        router.push(`/write/${postId}`); // 글을 수정하는 페이지로 이동
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

            // 글의 제목 가져오기
            const postDoc = await getDoc(doc(db, 'posts', postId));
            if (!postDoc.exists()) {
                throw new Error('Post document not found');
            }
            const postData = postDoc.data();

            // 댓글 데이터 구성
            const commentData = {
                postId: postId,
                postTitle: postData.title,
                authorId: currentUser.uid,
                authorName: userData.nickname, // 사용자의 닉네임 가져오기
                content: newComment,
                createdAt: new Date(),
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

    // content 필드에서 이미지 링크를 추출하는 함수 (예: Markdown 형식의 이미지 링크)
    const extractImageUrls = (content) => {
        const regex = /!\[.*?\]\((.*?)\)/g; // Markdown 이미지 링크 형식: ![alt](url)
        let matches;
        const urls = [];
        while ((matches = regex.exec(content)) !== null) {
            urls.push(matches[1]);
        }
        return urls;
    };

    const handleCommentEditToggle = (commentId) => {
        setComments((prevComments) =>
            prevComments.map((comment) =>
                comment.id === commentId
                    ? {
                        ...comment,
                        editMode: !comment.editMode,
                        newContent: comment.editMode ? '' : comment.content, // Reset newContent if toggling back to false
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
                editedAt: new Date(),
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

    const handleChatButtonClick = async (authorId) => {
        try {
            if (currentUser.uid === authorId) {
                alert('자기 자신과는 채팅방을 만들 수 없습니다.');
                return;
            }
    
            // 현재 사용자의 닉네임을 Firestore에서 가져옴
            const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
            let currentUserNickname = currentUser.displayName;
    
            if (userDoc.exists()) {
                const userData = userDoc.data();
                currentUserNickname = userData.nickname;
            }
    
            // Firestore에 새로운 채팅방 추가
            const chatRoomRef = await addDoc(collection(db, 'chatRooms'), {
                participants: [
                    { uid: currentUser.uid, nickname: currentUserNickname },
                    { uid: post.authorId, nickname: post.authorNickname },
                    // 다른 참가자 정보 추가 가능
                ],
                createdAt: new Date(),
                // messages: [], // 채팅 메시지들을 저장할 배열 필드
            });
    
            // 채팅방의 ID를 가져와 페이지 이동
            const chatRoomId = chatRoomRef.id;
            router.push(`/chat/${chatRoomId}`);
        } catch (error) {
            console.error('Error creating chat room:', error);
            // 오류 처리
        }
    };

    // 컴포넌트 정의
    const components = {
        img: ({ src, alt }) => (
            <img src={src} alt={alt} style={{ maxWidth: '400px', maxHeight: '500px' }} />
        )
    };

    const profileComponents = {
            img: ({ src, alt }) => (
                <img src={src} alt={alt} style={{ maxWidth: '50px', maxHeight: '50px', borderRadius: '50%' }} />
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
            <PostIdButton onClick={() => handleChatButtonClick(post.authorId)}>채팅하기</PostIdButton>
            <MetaInfo>
                <span>카테고리 : {post.category}</span>
                <span>
                    작성자 :{' '}
                        {post.authorNickname}
                </span>
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
                                            <CommentEditBtn onClick={() => handleCommentEdit(comment.id, comment.newContent)}>
                                                저장
                                            </CommentEditBtn>
                                            <button onClick={() => handleCommentEditToggle(comment.id)}>취소</button>
                                        </div>
                                    </div>
                                )}
                            </CommentBody>
                        ) : (
                            <CommentBody>{comment.content}</CommentBody>
                        )}
                        <CommentActions>
                            {currentUser && (currentUser.uid === comment.authorId || userType === 0) && (
                                <>
                                    <CommentEditBtn editMode={comment.editMode} onClick={() => handleCommentEditToggle(comment.id)}>수정</CommentEditBtn>
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
