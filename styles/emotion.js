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
    color: #90EE90; // #FE9A2E 
    font-size: 24px;
    font-weight: bold;
    padding: 10px;
    text-align: center;
    font-family: 'Inria Sans', sans-serif;
`;

// index, board, notice, question, review

export const MainWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
    margin-top: 50px;
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
    min-width: 200px;
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

export const Title = styled.div`
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #3D3D3D;
`;

export const PostList = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
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
    height: 70px;
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
    margin: 50px 0 10px 0;
    font-weight: bold;
    text-decoration: none;
    /* color: #A4A4A4; */
`;

export const Menu = styled.a`
    color: ${({ isActive }) => (isActive ? '#373737' : '#A4A4A4')};
    font-size: 13px;
    cursor: pointer;
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
    margin: 100px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    height: 100vh;
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
    width: 100%;
`;

export const PostIdContents = styled.div`
    flex: 1;
    width: 80%;
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

export const CommentEditBtn = styled.button`
    visibility: ${({ editMode }) => (editMode ? 'hidden' : 'visible')};
`;

export const ChatButton = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 8px 16px;
    cursor: pointer;
    margin-left: 10px;
    font-size: 14px;
    border-radius: 4px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;

// postmanager

export const PostManagementWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 600px;
    margin: 100px auto;
    padding: 30px;
    background-color: #f2f2f2;
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
    background-color: gray;
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
    background-color: #f2f2f2;
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
    background-color: #4caf50;
    color: white;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    `;

export const ProfileImageDeleteButton = styled.div`
    background-color: #4caf50;
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
    background-color: #4caf50;
    color: white;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    margin: 0 10px;

    &:last-child {
        background-color: #f44336;
    }
    `;

export const ProfileWithdrawButton = styled.div`
    background-color: #f44336;
    color: white;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 20px;
    text-align: center;
`;


// find

export const FindWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f2f2f2;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-top: 50px;
    height: 500px;
`;

// inquiry

export const InquiryWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-top: 50px;
    height: 70vh;
    overflow-y: auto;
`;

export const InquiryList = styled.div`
    margin-top: 20px;
    border: 1px solid #ccc;
    padding: 10px;
    div{
        margin-bottom: 10px;
        padding: 10px;
        border: 1px solid #ddd;
        background-color: #f9f9f9;
    }
    p{
        margin: 0;
        font-size: 16px;
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
    margin-top: 50px;
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
    background-color: #0070f3; /* 적절한 색상으로 수정 */
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0058b8; /* hover 시 색상 변경 */
    }
`;

// chat

export const ChatWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin: 50px auto;
    max-width: 400px;
`;


// chatRoom

export const ChatRoomWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: #f2f2f2;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin: 50px auto;
    max-width: 400px;
    box-sizing: border-box;
    height: 80vh;
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
    margin-bottom: 10px;
`;

export const MessageContent = styled.div`
    background-color: ${props => props.isSelf ? '#DCF8C6' : '#ffffff'};
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    font-size: 14px;
    margin-right: ${props => props.isSelf ? 0 : '10px'};
    margin-left: ${props => props.isSelf ? '10px' : 0};
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
    img {
        width: 30px;
        height: 30px;
        border-radius: 50%; 
        margin-right: 8px;
        overflow: hidden;
    }
`;

export const MessageTimestamp = styled.div`
    font-size: 0.8rem;
    color: #888888;
`;

export const MessageBubble = styled.div`
    background-color: ${props => props.isSelf ? '#DCF8C6' : '#ffffff'};
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    font-size: 14px;
    margin-bottom: 10px;
    padding: 5px;
    word-wrap: break-word;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    align-self: ${props => props.isSelf ? 'flex-end' : 'flex-start'};
    p{
        margin: 0;
        padding: 5px;
    }
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
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    margin-left: 10px;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
        background-color: #45a049;
    }
`;