import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { LoginContainer, LoginTitle, LoginID, LoginPW, LoginBtn, SignupFind } from '../../styles/emotion';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert('로그인에 성공하였습니다.');
            router.push('/main');
        } catch (error) {
            console.error('로그인 실패:', error);
            alert('로그인에 실패하였습니다.');
        }
    };

    const handleWriteClick = () => {
        router.push('/signup');
    };

    return(
        <LoginContainer>
            <LoginTitle>로그인</LoginTitle>
            <LoginID><input type="text" placeholder="아이디를 입력하세요." value={email} onChange={(e) => setEmail(e.target.value)}/></LoginID>
            <LoginPW><input type="password" placeholder="비밀번호를 입력하세요." value={password} onChange={(e) => setPassword(e.target.value)}/></LoginPW>
            <LoginBtn onClick={handleLogin}>로그인</LoginBtn>
            <SignupFind>
                <span onClick={handleWriteClick}>회원가입</span>
                <span>아이디 / 비밀번호 찾기</span>
            </SignupFind>
        </LoginContainer>
    );
};