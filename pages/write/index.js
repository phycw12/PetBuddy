import { useState } from 'react';
import { useRouter } from 'next/router';
import { db, storage } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { useAuth } from '../context/AuthContext';
import { WrapperWrite, Logo, FormWrapper, TitleWrite, Editor, ImageUpload, WriteButton, CategorySelect } from '../../styles/emotion';

export default function Write() {
    const { user, userData } = useAuth();
    const router = useRouter();
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState('');
 
    const handleContentChange = (e) => {
      setContent(e.target.value);
    };

    const handleTitleChange = (e) => {
      setTitle(e.target.value);
    };

    const handleImageChange = (e) => {
      setImage(e.target.files[0]);
    };

    const handleCategoryChange = (e) => {
      setCategory(e.target.value);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
          // 이미지 업로드
          let imageUrl = null;
          if (image) {
              const imageRef = ref(storage, `images/${image.name}`);
              await uploadString(imageRef, image, 'data_url');
              imageUrl = await getDownloadURL(imageRef);
          }

          // 게시물 데이터 생성
          const postData = {
              authorId: user.uid,
              email: userData.email,
              authorNickname: userData.nickname,
              createdAt: serverTimestamp(),
              category,
              title,
              content,
              imageUrl,
          };

          // Firestore에 게시물 추가
          const docRef = await addDoc(collection(db, 'posts'), postData);
          console.log('Document written with ID: ', docRef.id);

          // 작성 완료 후 홈 페이지로 이동
          router.push('/main');
      } catch (error) {
          console.error('Error adding document: ', error);
      }
  };

    return(
        <>
            <Logo>PetBuddy</Logo>
            <WrapperWrite>
                <FormWrapper onSubmit={handleSubmit}>
                    <CategorySelect>
                        <select value={category} onChange={handleCategoryChange}>
                          <option value="">말머리</option>
                          <option value="freeboard">자유게시판</option>
                          <option value="question">궁금해요</option>
                          <option value="review">사용후기</option>
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
                        placeholder="내용을 입력하세요"
                        value={content}
                        onChange={handleContentChange}
                        />
                    </Editor>
                    <ImageUpload>
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                    </ImageUpload>
                    <WriteButton type="submit">작성하기</WriteButton>
                </FormWrapper>
            </WrapperWrite>
        </>
    );
};