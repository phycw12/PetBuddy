import { useState } from 'react';
import { useRouter } from 'next/router';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { SignUpContainer, SignupTitle, IDInput, PWInput, PWCheck, NicknameInput, Terms, Term, Term1, Term2, SignUpBtn } from '../../styles/emotion';

export default function SignUp() {
    const router = useRouter();
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [pwCheck, setPwCheck] = useState("");
    const [nickname, setNickname] = useState("");

    const handleEmailChange = (e) => setEmailId(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handlePwCheckChange = (e) => setPwCheck(e.target.value);
    const handleNicknameChange = (e) => setNickname(e.target.value)

    const signupHandler = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, emailId, password);
            const user = userCredential.user;
            
            await setDoc(doc(db, "users", user.uid), {
                email: emailId,
                password: password,
                nickname: nickname,
                createdAt: new Date(),
                userType: 1,
            });
            console.log('회원가입 성공:', user);
            setEmailId("");
            setPassword("");
            setPwCheck("");
            setNickname("");
            alert('회원가입에 성공하였습니다.');
            router.push('/login');
        } catch (error) {
            console.error('회원가입 실패:', error);
            alert('회원가입에 실패하였습니다.');
        }
    };

    return(
        <SignUpContainer>
            <SignupTitle>회원가입</SignupTitle>
            <IDInput>
                <input type="text" placeholder="아이디를 입력하세요 (이메일)" value={emailId} onChange={handleEmailChange}/>
            </IDInput>
            <PWInput>
                <input type="password" placeholder="비밀번호를 입력하세요" value={password} onChange={handlePasswordChange}/>
            </PWInput>
            <PWCheck>
                <input type="password" placeholder="비밀번호 확인" value={pwCheck} onChange={handlePwCheckChange}/>
            </PWCheck>
            <NicknameInput>
                <input type="text" placeholder="닉네임을 입력하세요" value={nickname} onChange={handleNicknameChange}/>
            </NicknameInput>
            <Terms>
                <Term><input type="radio"/>모두 동의합니다.</Term>
                <Term1>
                    <input type="radio"/>약관 1
                    <span>보기 &gt;</span>
                </Term1>
                <Term2>
                    <input type="radio"/>약관 2
                    <span>보기 &gt;</span>
                </Term2>
            </Terms>
            <SignUpBtn onClick={() => signupHandler(emailId, password)}>가입하기</SignUpBtn>
        </SignUpContainer>
    );
};