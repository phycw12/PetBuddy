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
    color: ${({ isActive }) => (isActive ? '#E800AD' : '#888888')};
    font-size: 12px;
    cursor: pointer;
    .MenuIcon {
        width: 24px;
        height: 24px;
        margin-bottom: 5px;
    }
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
    color: #E800AD;
    // #FE9A2E #90EE90
    font-size: 24px;
    font-weight: bold;
    padding: 10px;
    text-align: center;
    font-family: 'Inria Sans', sans-serif;
`;

// search icon

export const Search = styled.img`
    width: 24px;
    height: 24px;
    margin-left: 10px;
    cursor: pointer;
`;

export const TitleHeader = styled.div`
    position: relative;
    display: inline-block;
    width: 100%;
    margin-top: 10px;
    cursor: pointer;
    .searchIcon{
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        font-size: 16px;
        color: #999;
    }
`;

export const SearchInput = styled.input`
    width: 100%;
    padding: 10px;
    background-color: #E3E3E3;
    border: none;
    border-radius: 4px;
    pointer-events: none; /* input 비활성화 */
    box-sizing: border-box;
`;

// back

export const Back = styled.div`
    position: fixed;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    margin: 20px;
    cursor: pointer;
`;

export const BackImg = styled.img`
    width: 20px;
    height: 20px;
    cursor: pointer;
`;

// index, board

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
    min-width: 300px;
`;

export const Section = styled.section`
    width: 100%;
    max-width: 600px;
    margin: 20px auto;
    box-sizing: border-box;
`;

export const PostList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

export const Post = styled.div`
    width: 100%;
    margin-bottom: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
`;

export const PostTitle = styled.h3`
    font-size: 18px;
    font-weight: bold;
    margin: 10px 0;
`;

export const PostAuthor = styled.p`
    font-size: 14px;
    color: #777777;
`;

export const PostContent = styled.div`
    padding: 15px;
`;

export const PostText = styled.p`
    font-size: 14px;
    line-height: 1.5;
    color: #333333;
`;

export const CommentSection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
`;

export const CommentIcon = styled.span`
    color: #999999;
    font-size: 14px;
`;

export const CommentCount = styled.span`
    font-size: 12px;
    color: #999999;
`;

// index

export const PostTitleImg = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`;

export const PostImage = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 10px 10px 0 0;
`;

export const PostDate = styled.p`
    font-size: 12px;
    color: #999999;
    margin-bottom: 10px;
`;

export const PostFooter = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #999999;
    padding: 10px 15px;
`;

// board

export const MenuList = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    font-weight: bold;
    text-decoration: none;
    margin: 5px auto;
`;

export const Menu = styled.a`
    color: ${({ isActive }) => (isActive ? '#E800AD' : '#A4A4A4')};
    font-size: 14px;
    margin-left: 5px;
    cursor: pointer;
    position: relative;
    text-decoration: none;
    transition: color 0.3s ease;

    &::after {
        content: '';
        position: absolute;
        bottom: -3px;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: ${({ isActive }) => (isActive ? '#E800AD' : 'transparent')};
        transition: background-color 0.3s ease, width 0.3s ease;
    }

    &:hover::after {
        background-color: #E800AD;
        width: 100%;
    }
`;

export const DivisionLine = styled.div`
    border-top: 1.5px solid #444444;
    margin: 10px auto;
`;

export const OrderBy = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    font-size: 12px;
    margin-top: 10px;
`;

export const OrderByList = styled.div`
    font-size: 12px;
    margin-bottom: 10px; 
    margin-left: 5px; 
    color: ${({ isActive }) => (isActive ? '#373737' : '#A4A4A4')};
    cursor: pointer;
`;

export const WriteHeader = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    cursor: pointer;
`;

export const Write = styled.div`
    font-size: 12px;
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
    margin : 50px auto;
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
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin: 50px auto;
    width: 100%;
    max-width: 450px;
    font-size: 13px;
`;

export const MyPageSection1 = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

export const MyPageSection1_1 = styled.div`
    display: flex;
    align-items: center;

    img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
    }
`;

export const NicknameLogout = styled.div`
    display: flex;
    flex-direction: column;

    span {
        margin-bottom: 5px;
    }
`;

export const MyPageNickname = styled.span`
    font-weight: bold;
`;

export const Logout = styled.span`
    cursor: pointer;
    color: #007bff;

    &:hover {
        text-decoration: underline;
    }
`;

export const MyPageId = styled.span`
    font-size: 12px;
    color: #666;
`;

export const MyPageSection2 = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
`;

export const MyPagePost = styled.div`
    text-align: center;
`;

export const MyPageComment = styled.div`
    text-align: center;
`;

export const MyPageSection3 = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const MyPageSection3_1 = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 20px;

    span {
        cursor: pointer;
        margin-bottom: 10px;

        &:hover {
            text-decoration: underline;
        }
    }
`;

export const MyPageSection3_2 = styled.div`
    display: flex;
    flex-direction: column;

    span {
        cursor: pointer;
        margin-bottom: 10px;

        &:hover {
            text-decoration: underline;
        }
    }
`;

// [postId].js

export const PostIdContainer = styled.div`
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-sizing: border-box;
    width: 100%;
    max-width: 450px;
    margin: 50px auto;
`;

export const PostIdTitle = styled.h1`
    font-size: 24px;
    margin-bottom: 10px;
`;

export const MetaInfo = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    margin-bottom: 10px;
`;

export const PostIdContents = styled.div`
    margin-top: 20px;
    font-size: 16px;

    p {
        margin-bottom: 10px;
    }

    img {
        max-width: 100%;
        height: auto;
        margin-bottom: 10px;
    }
`;

export const ActionButtons = styled.div`
    margin-bottom: 10px;

    button {
        margin-right: 10px;
        padding: 8px 16px;
        background-color: #FF86C4;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;

        &:hover {
            background-color: #FF62AE;
        }
    }
`;

export const PostIdButton = styled.button`
    padding: 8px 16px;
    background-color: #FF86C4;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 10px;

    &:hover {
        background-color: #FF62AE;
    }
`;

export const CommentsContainer = styled.div`
    margin-top: 20px;
`;

export const Comment = styled.div`
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 10px;
    margin-bottom: 10px;
`;

export const CommentHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

    span {
        font-weight: bold;
    }
`;

export const CommentBody = styled.div`
    margin-bottom: 10px;
`;

export const CommentActions = styled.div`
    display: flex;

    button {
        margin-right: 10px;
        padding: 6px 12px;
        background-color: #FF86C4;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;

        &:hover {
            background-color: #FF62AE;
        }
    }
`;

export const CommentInputContainer = styled.div`
    display: flex;
    margin-bottom: 10px;
`;

export const CommentInput = styled.textarea`
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
`;

export const CommentSubmitButton = styled.button`
    padding: 10px 16px;
    background-color: #FF86C4;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-left: 10px;

    &:hover {
        background-color: #FF62AE;
    }
`;

export const CommentEditBtn = styled.button`
    padding: 6px 12px;
    background-color: ${({ editMode }) => (editMode ? '#FF86C4' : '#FF62AE')};
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 10px;

    &:hover {
        background-color: ${({ editMode }) => (editMode ? '#FF86C4' : '#FF62AE')};
    }
`;

export const ChatButton = styled.button`
    padding: 8px 16px;
    background-color: #FF86C4;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-left: 10px;

    &:hover {
        background-color: #FF62AE;
    }
`;

// postmanager

export const PostManagementWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 600px;
    margin: 50px auto;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const PostWritten = styled.div`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
`;

export const PostWrittenWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const PostWrittenContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
`;

export const PostWrittenTitle = styled.div`
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
`;

export const PostManagementDelete = styled.div`
    background-color: #FF86C4;
    color: white;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
`;

export const PostManagementDate = styled.div`
    font-size: 14px;
    color: #666;
    margin-top: 5px;
`;

export const CommentWritten = styled.div`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
`;

export const CommentWrittenWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const CommentWrittenContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
`;

export const CommentWrittenContent = styled.div`
    font-size: 16px;
    cursor: pointer;
`;

export const CommentWrittenTitle = styled.div`
    font-size: 14px;
    color: #666;
    margin-top: 5px;
    cursor: pointer;
`;

export const DivisionLine2 = styled.div`
    border-bottom: 1px solid #ccc;
    margin: 10px 0;
`;

// profilemanager

export const ProfileWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-top: 50px;
    height: 600px;
    `;

export const ProfileHeader = styled.div`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
    `;

export const ProfileImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    `;

export const ProfileImageUploadButton = styled.div`
    background-color: #FF86C4;
    color: white;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    `;

export const ProfileImageDeleteButton = styled.div`
    background-color: #FF86C4;
    color: white;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    `;

export const ProfileNicknameInput = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    `;

export const ProfilePasswordInput = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    `;

export const ProfilePasswordConfirmInput = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    `;

export const ProfileButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    `;

export const ProfileButton = styled.span`
    background-color: #FF86C4;
    color: white;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    margin: 0 10px;

    &:last-child {
        background-color: #FF62AE;
    }
    `;

export const ProfileWithdrawButton = styled.div`
    background-color: #FF86C4;
    color: white;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 20px;
    text-align: center;
`;


// search page

export const FindWrapper = styled.div`
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-bottom: 20px;
    width: 100%;
    max-width: 450px;
    margin: 50px auto;

    input {
        padding: 8px;
        margin-right: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 13px;
    }

    button {
        padding: 8px 16px;
        background-color: #FF86C4;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 13px;
    }

    button:hover {
        background-color: #FF62AE;
    }

    ul {
        list-style-type: none;
        padding: 0;
        margin: 10px 0;
    }

    li {
        margin-bottom: 10px;
        padding: 10px;
        border: 1px solid #eee;
        border-radius: 4px;
        cursor: pointer;
    }

    h3 {
        margin: 0;
        font-size: 16px;
        color: #007bff;
        cursor: pointer;
    }

    p {
        margin: 0;
        font-size: 13px;
        color: #333;
        cursor: pointer;
    }
`;

// inquiry

export const InquiryWrapper = styled.div`
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin: 50px auto;
    height: 600px;

    h1 {
        font-size: 20px;
        margin-bottom: 10px;
    }

    label {
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 5px;
        display: block;
    }

    input[type='text'],
    textarea {
        width: 100%;
        padding: 8px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 13px;
    }

    textarea {
        resize: vertical;
        min-height: 100px;
    }

    button {
        padding: 8px 16px;
        background-color: #FF86C4;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 13px;
    }

    button:hover {
        background-color: #FF62AE;
    }

    h2 {
        font-size: 16px;
        margin-top: 20px;
        margin-bottom: 10px;
    }

    p {
        font-size: 13px;
        margin-bottom: 5px;
    }
`;

export const InquiryList = styled.div`
    margin-top: 10px;

    div {
        border: 1px solid #eee;
        border-radius: 4px;
        padding: 10px;
        margin-bottom: 10px;
    }

    p {
        margin: 0;
    }
`;

// accountRecovery

export const AccountRecoveryContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f2f2f2;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin: 50px auto;
    width: 100%;
    max-width: 450px;
`;

export const AccountRecoveryTitle = styled.h1`
    font-size: 24px;
    margin-bottom: 20px;
`;

export const AccountRecoveryIDInput = styled.div`
    width: 100%;
    margin-bottom: 10px;
    input {
        width: 100%;
        padding: 10px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }
`;

export const AccountRecoveryPWInput = styled.div`
    width: 100%;
    margin-bottom: 10px;
    input {
        width: 100%;
        padding: 10px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }
`;

export const AccountRecoveryPWCheck = styled.div`
    width: 100%;
    margin-bottom: 10px;
    input {
        width: 100%;
        padding: 10px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }
`;

export const AccountRecoveryNicknameInput = styled.div`
    width: 100%;
    margin-bottom: 10px;
    input {
        width: 100%;
        padding: 10px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }
`;

export const AccountRecoveryTerms = styled.div`
    margin-bottom: 10px;
`;

export const AccountRecoveryTerm = styled.label`
    display: block;
    margin-bottom: 5px;
`;

export const AccountRecoveryBtn = styled.button`
    width: 100%;
    padding: 10px;
    font-size: 16px;
    color: #fff;
    background-color: #FF86C4;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #FF62AE;
    }
`;

// chat

export const ChatWrapper = styled.div`
    padding: 20px;
    margin: 50px auto 0;
    max-width: 400px;
`;

export const ChatList = styled.div`
    font-size: 14px;
    text-align: center;
`;

export const ChatRoomList = styled.ul`
    list-style: none;
    padding: 0;
`;

export const ChatRoomItem = styled.li`
    margin-bottom: 10px;
`;

export const ChatRoomButton = styled.button`
    display: flex;
    align-items: center;
    padding: 10px 15px;
    width: 100%;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #f1f1f1;
    }
`;

export const ChatRoomDetails = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

export const ChatRoomName = styled.span`
    font-size: 12px;
    font-weight: bold;
    color: #333;
`;

export const ChatRoomDate = styled.span`
    font-size: 10px;
    color: #888;
`;

export const DivisionLine_2 = styled.hr`
    border: none;
    border-top: 1px solid #ddd;
    margin: 10px 0;
`;


// chatRoom

export const ChatRoomWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: #f2f2f2;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin: 0 auto;
    max-width: 400px;
    box-sizing: border-box;
    height: 90vh;
`;

export const MessageListWrapper = styled.div`
    flex: 1;
    overflow-y: scroll;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const MessageWrapper = styled.div`
    display: flex;
    justify-content: ${props => props.isSelf ? 'flex-end' : 'flex-start'};
    align-items: ${props => props.isSelf ? 'flex-end' : 'center'};
    margin-bottom: 10px;
`;

export const MessageContent = styled.div`
    background-color: ${props => props.isSelf ? '#DCF8C6' : '#ffffff'};
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    font-size: 14px;
    /* margin-right: ${props => props.isSelf ? 0 : '10px'};
    margin-left: ${props => props.isSelf ? '10px' : 0}; */
    padding: 5px;
    word-wrap: break-word;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    align-self: ${props => props.isSelf ? 'flex-end' : 'flex-start'};
    p {
        margin: 0;
        padding: 5px;
    }
`;

export const SenderInfo = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 5px;
`;

export const MessageTimestamp = styled.div`
    font-size: 12px;
    color: #888888;
    margin-right: ${props => props.isSelf ? '5px' : '0'};
    margin-left: ${props => props.isSelf ? '0' : '5px'};
`;

export const MessageSender = styled.div`
    font-weight: bold;
    margin-bottom: 5px;
    img {
        width: 30px;
        height: 30px;
        border-radius: 50%; 
        margin-right: 8px;
        overflow: hidden;
    }
`;

export const MessageInputWrapper = styled.form`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 2px;
    margin-top: 10px;
`;

export const MessageInput = styled.input`
    flex: 1;
    border: none;
    outline: none;
    padding: 8px;
    font-size: 1rem;
`;

export const SendMessageButton = styled.button`
    background-color: #FF86C4;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    margin-left: 10px;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
        background-color: #FF62AE;
    }
`;

export const DateSeparator = styled.div`
    text-align: center;
    margin: 20px 0;
    border-top: 1px solid #ccc;
    padding-top: 10px;
    font-size: 12px;
`;

// loading

export const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 250px auto;
`;