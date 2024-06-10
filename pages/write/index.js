import { useState } from 'react';
import { WrapperWrite, Logo, FormWrapper, TitleWrite, Editor, ImageUpload, WriteButton, CategorySelect } from '../../styles/emotion';

export default function Write() {
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
   
    const handleSubmit = (e) => {
      e.preventDefault();
      // Submit data to server
    };

    return(
        <>
            <Logo>PetBuddy</Logo>
            <WrapperWrite>
                <FormWrapper onSubmit={handleSubmit}>
                    <CategorySelect>
                        <select value={category} onChange={handleCategoryChange}>
                        <option value="">말머리</option>
                        <option value="category1">Category 1</option>
                        <option value="category2">Category 2</option>
                        <option value="category3">Category 3</option>
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