import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { db, storage } from '../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import useAuthStore from '@/zustand/authStore';
import { WrapperWrite, FormWrapper, TitleWrite, Editor, ImageUpload, WriteButton, CategorySelect } from '../../styles/emotion';

export default function Post() {
    const router = useRouter();
    const { postId } = router.query;
    const { user, userData } = useAuthStore();
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const fileInputRef = useRef(null);
    const textAreaRef = useRef(null);

    useEffect(() => {
        async function fetchPostData() {
            if (postId) {
                try {
                    const docRef = doc(db, 'posts', postId);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const postData = docSnap.data();
                        setTitle(postData.title);
                        setCategory(postData.category);
                        setContent(postData.content);
                    } else {
                        console.log('No such document!');
                    }
                } catch (error) {
                    console.error('Error fetching document:', error);
                }
            }
        }
        fetchPostData();
    }, [postId]);

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_'); // 특수 문자 제거
            const imageRef = ref(storage, `post/${sanitizedFileName}`);
            await uploadBytes(imageRef, file);
            const imageUrl = await getDownloadURL(imageRef);
            insertImageUrl(imageUrl);
        }
    };

    const insertImageUrl = (url) => {
        const textarea = textAreaRef.current;
        const startPos = textarea.selectionStart;
        const endPos = textarea.selectionEnd;
        const newContent = content.substring(0, startPos) + `![image](${url})` + content.substring(endPos);
        setContent(newContent);
    };

    const handleImageUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // 수정할 게시물 데이터 생성
            const postData = {
                authorNickname: userData.nickname,
                editedAt: new Date(),
                category,
                title,
                content,
            };

            // Firestore에 수정된 게시물 업데이트
            const docRef = doc(db, 'posts', postId);
            await updateDoc(docRef, postData);
            console.log('Document updated with ID: ', postId);

            // 수정 완료 후 게시물 페이지로 이동
            router.push(`/board/${category}`);
        } catch (error) {
                console.error('Error updating document: ', error);
            }
    };

    const handleGoBack = () => {
        router.back(); // 이전 페이지로 돌아가기
    };

    return (
        <>
            <WrapperWrite>
                <button onClick={handleGoBack}>뒤로가기</button>
                <FormWrapper onSubmit={handleSubmit}>
                    <CategorySelect>
                        <select value={category} onChange={handleCategoryChange}>
                            <option value="">말머리</option>
                            <option value="freeboard">자유게시판</option>
                            <option value="question">궁금해요</option>
                            <option value="review">사용후기</option>
                            {userData && userData.userType === 0 && <option value="notice">공지사항</option>}
                        </select>
                    </CategorySelect>
                    <TitleWrite>
                        <input
                            type="text"
                            placeholder="제목"
                            value={title}
                            onChange={handleTitleChange}
                        />
                    </TitleWrite>
                    <Editor>
                        <textarea
                            ref={textAreaRef}
                            placeholder="내용을 입력하세요"
                            value={content}
                            onChange={handleContentChange}
                        />
                    </Editor>
                    <ImageUpload>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleImageChange}
                        />
                        <button type="button" onClick={handleImageUploadClick}>이미지 업로드</button>
                    </ImageUpload>
                    <WriteButton type="submit">작성하기</WriteButton>
                </FormWrapper>
            </WrapperWrite>
        </>
    );
};
