import styled from '@emotion/styled';
import '@fontsource/inria-sans'; // npm install --save @fontsource/inria-sans

// menu

export const FixedNav = styled.div`
    position: fixed;
    bottom: 0;
    left: 37%;
    width: 400px;
    background-color: #fff;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px 0;
    z-index: 999;
    border-radius: 20px 20px 0 0;
`;

export const MenuItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #333;
    font-size: 12px;
`;

    export const MenuIcon = styled.img`
    width: 24px;
    height: 24px;
    margin-bottom: 5px;
`;

export const MenuText = styled.span`
    font-size: 12px;
`;

// main, board, write

export const Logo = styled.div`
    position: fixed;
    width: 100%;
    color: gray;
    background-color: white;
    font-size: 24px;
    font-weight: bold;
    margin-top: -10px;
    padding: 10px;
    // height: 7%;
    text-align: center;
    font-family: 'Inria Sans', sans-serif;
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
`;

export const Section = styled.section`
    width: 100%;
    max-width: 410px;
    margin: 0px 80px;
    box-sizing: border-box;
`;

export const Section2 = styled.section`
    width: 100%;
    max-width: 410px;
    margin: 0px 100px 80px 100px;
    box-sizing: border-box;
`;

export const TitleSearch = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Title = styled.h2`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
`;

export const PostList = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
`;

export const Post = styled.div`
    border-radius: 10px;
    padding: 20px;
    text-align: center;
`;

export const PostTitle = styled.div`
    height: 30%;
    font-size: 15px;
    font-weight: bold;
    padding-top: 15px;
`;

export const PostDate = styled.div`
    display: flex;
    font-size: 11px;
    color: #373737;
`;

export const PostAuthor = styled.div`
    display: flex;
    font-size: 12px;
    color: #373737;
`;

export const PostFooter = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 10px;
    color: #373737;
`;

export const PostImage = styled.img`
    width: 80%;
    height: 100px;
    object-fit: cover;
    border-radius: 10px 10px 0 0;
`

export const Search = styled.img`
    width: 24px;
    height: 24px;
`;

export const WritePage = styled.img`
    position: fixed;
    bottom: 10%;
    left: 60%;
    width: 40px;
    height: 40px;
    cursor: pointer;
`;

// board, notice, question, review

export const MenuList = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 20px 0 0 0;
    font-weight: bold;
    text-decoration: none;
    /* color: #A4A4A4; */
`;

export const Menu = styled.a`
  color: ${({ isActive }) => (isActive ? '#373737' : '#A4A4A4')};
  cursor: pointer;
`;

// write

export const WrapperWrite = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
`;

export const FormWrapper = styled.div`
  margin-top: 60px;
`;

export const TitleWrite = styled.h1`
  font-size: 24px;
  margin: 0;
`;

export const Editor = styled.div`
  margin-bottom: 20px;

  textarea {
    width: 100%;
    height: 200px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
  }
`;

export const ImageUpload = styled.div`
  margin-bottom: 20px;
`;

export const WriteButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const CategorySelect = styled.div`
  margin-bottom: 20px;

  select {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

