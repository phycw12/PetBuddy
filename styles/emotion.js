import styled from '@emotion/styled';

// menu

export const NavContainer = styled.div`
    width: 100%;
    background-color: transparent;
    z-index: 998;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
`;

export const FixedNav = styled.div`
    width: 400px;
    /* min-width: 230px; */
    background-color: #fff;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px 0;
    border-radius: 20px 20px 0 0;
`;

export const MenuItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #333;
    font-size: 12px;
    cursor: pointer;
`;

    export const MenuIcon = styled.img`
    width: 24px;
    height: 24px;
    margin-bottom: 5px;
`;

export const MenuText = styled.span`
    font-size: 12px;
`;

// logo

export const LogoContainer = styled.div`
    width: 100%;
    background-color: white;
    z-index: 998;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
`;

export const Logo = styled.div`
    color: gray;
    font-size: 24px;
    font-weight: bold;
    padding: 10px;
    text-align: center;
    font-family: 'Inria Sans', sans-serif;
`;

// index, board, notice, question, review

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
    margin: 0px 80px 20px 80px;
    box-sizing: border-box;
`;

export const Section2 = styled.section`
    width: 100%;
    max-width: 410px;
    margin: 0px 100px 80px 100px;
    box-sizing: border-box;
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

export const PostTitleImg = styled.div`
    margin-bottom: 5px;
`;

export const PostTitle = styled.div`
    height: 30%;
    font-size: 15px;
    font-weight: bold;
    padding-top: 15px;
    cursor: pointer;
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
    height: 100px;
    object-fit: cover;
    border-radius: 10px 10px 0 0;
    cursor: pointer;
`

export const TitleHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`;

// search

export const Search = styled.img`
    width: 24px;
    height: 24px;
    margin-left: 10px;
    cursor: pointer;
`;

// writebtn

export const WritePage = styled.img`
    width: 20px;
    height: 20px;
    margin-left: 10px;
    cursor: pointer;
`;

// freeboard, notice, question, review

export const MenuList = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 20px 0 10px 0;
    font-weight: bold;
    text-decoration: none;
    /* color: #A4A4A4; */
`;

export const Menu = styled.a`
    color: ${({ isActive }) => (isActive ? '#373737' : '#A4A4A4')};
    cursor: pointer;
`;

export const DivisionLine = styled.div`
    border-top: 1.5px solid #444444;
    margin: 10px auto;
    width: 400px;        
`;

export const OrderBy = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    font-size: 12px;
`;

export const OrderByList = styled.div`
    font-size: 12px;
    margin-bottom: 10px; 
    margin-left: 5px; 
    color: ${({ isActive }) => (isActive ? '#373737' : '#A4A4A4')};
    cursor: pointer;
`;

// write

export const WrapperWrite = styled.div`
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    display: flex;
`;

export const FormWrapper = styled.form`
    margin-top: 60px;
`;

export const TitleWrite = styled.h1`
    font-size: 24px;
    margin-bottom: 10px;
    input{
    width: 410px;
    border: none;
    border-bottom : 2px solid #ccc;
    };
    input:focus {
        outline : none;
    };
`;

export const Editor = styled.div`
    margin-bottom: 20px;
    textarea {
    width: 100%;
    height: 200px;
    padding: 10px;
    border: none;
    border-bottom: 2px solid #ccc;
    resize: none;
    line-height: 20px;
    };
    textarea:focus{
        outline: none;
    }
`;

export const ImageUpload = styled.div`
    margin-bottom: 20px;
`;

export const WriteButton = styled.button`
    background-color: #E1E1E1;
    color: #585858;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
    background-color: #D0CACA;
}`;

export const CategorySelect = styled.div`
    margin-bottom: 10px;
    select {
    width: 420px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}`;

// signup

export const SignUpContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 400px;
    margin : 200px auto 0;
`;

export const SignupTitle = styled.div`
    font-size: 20px;
    color: #414141;
    margin-bottom: 20px;
`;

export const IDInput = styled.div`
    width: 250px;
    margin-bottom: 20px;
    input {
    width: 250px;
    border: none;
    border-bottom : 2px solid #414141;
    };
    input:focus {
        outline : none;
    };
`;

export const PWInput = styled.div`
    width: 250px;
    margin-bottom: 20px;
    input {
    width: 250px;
    border: none;
    border-bottom : 2px solid #414141;
    };
    input:focus {
        outline : none;
    };
`;

export const PWCheck = styled.div`
    width: 250px;
    margin-bottom: 20px;
    input {
    width: 250px;
    border: none;
    border-bottom : 2px solid #414141;
    };
    input:focus {
        outline : none;
    };
`;

export const NicknameInput = styled.div`
    width: 250px;
    margin-bottom: 20px;
    input {
    width: 250px;
    border: none;
    border-bottom : 2px solid #414141;
    };
    input:focus {
        outline : none;
    };
`;

export const Terms = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
`;

export const Term = styled.div`
    margin-bottom: 10px;
    font-size: 15px;
`;

export const Term1 = styled.div`
    /* margin-bottom: 5px; */
    font-size: 12px;
    span {
        margin-left: 100px;
    }
`;

export const Term2 = styled.div`
    margin-bottom: 10px;
    font-size: 12px;
    span {
        margin-left: 100px;
    }
`;

export const SignUpBtn = styled.button`
    background-color: #E1E1E1;
    color: #585858;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
    background-color: #D0CACA;
    }
`;

// login

export const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 400px;
    margin : 200px auto 0;
`;

export const LoginTitle = styled.div`
    font-size: 20px;
    color: #414141;
    margin-bottom: 20px;
`;

export const LoginID = styled.div`
    width: 250px;
    margin-bottom: 20px;
    input {
    width: 250px;
    border : 2px solid #CFCFCF;
    border-radius: 5px;
    padding: 7px;
    };
    input:focus {
        outline : none;
    };
`;

export const LoginPW = styled.div`
    width: 250px;
    margin-bottom: 20px;
    input {
    width: 250px;
    border : 2px solid #CFCFCF;
    border-radius: 5px;
    padding: 7px;
    };
    input:focus {
        outline : none;
    };
`;

export const LoginBtn = styled.button`
    background-color: #E1E1E1;
    color: #585858;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
    background-color: #D0CACA;
    }
`;

export const SignupFind = styled.div`
    display: flex;
    flex-direction: row;
    span {
        margin: 10px;
        cursor: pointer;
    };
`;

// mypage

export const MyPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 400px;
    margin: 200px auto 0;
`;

export const MyPageSection1 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
`;

export const MyPageSection1_1 = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const NicknameLogout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-left: 10px;
`;

export const MyPageNickname = styled.div`
    font-weight: bold;
`;

export const ProfileImg = styled.img`
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Logout = styled.button`
    background-color: transparent;
    border: none;
    color: #007AFF;
    cursor: pointer;
`;

export const MyPageId = styled.div`
    margin-top: 10px;
`;

export const MyPageSection2 = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    margin: 10px 0;
    border: 1px solid #D9D9D9;
    border-radius: 5px;
    padding: 10px;
`;

export const MyPagePost = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const MyPageComment = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const MyPageSection3 = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    border: 1px solid #D9D9D9;
    border-radius: 5px;
    padding: 10px;
`;

export const MyPageSection3_1 = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-bottom: 10px;
`;
export const MyPageSection3_2 = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`;

// [postId].js

export const PostIdContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 400px;
    height: 500px;
    margin : 100px auto;padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

export const PostIdTitle = styled.h1`
    font-size: 24px;
    color: #333;
`;

export const MetaInfo = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #666;
    margin-bottom: 20px;
`;

export const PostIdContents = styled.div`
    max-width: 300px;
    height: 300px;
    overflow: auto;
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const ActionButtons = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
`;

export const PostIdButton = styled.button`
    padding: 10px 20px;
    margin-left: 10px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    cursor: pointer;

    &:hover {
    background-color: #0056b3;
    }
`;

export const CommentsContainer = styled.div`
    width: 100%;
    margin-top: 20px;
`;

export const CommentInputContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    width: 100%;
`;

export const CommentInput = styled.textarea`
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-right: 10px;
`;

export const CommentSubmitButton = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

export const Comment = styled.div`
    background-color: #fff;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const CommentHeader = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
    }
`;

export const CommentBody = styled.div`
    font-size: 14px;
    color: #333;
`;

export const CommentActions = styled.div`
    display: flex;
    justify-content: flex-end;
    button {
        margin-left: 10px;
        border: none;
        background: none;
        color: #007bff;
        cursor: pointer;

        &:hover {
            text-decoration: underline;
        }
    }
`;
