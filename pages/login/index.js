import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { LoginContainer, LoginTitle, LoginID, LoginPW, LoginBtn, SignupFind } from '../../styles/emotion';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null); // 사용자 상태 추가

    const router = useRouter();

    useEffect(() => {
        // 사용자 로그인 상태 변경 감지
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user); // 로그인된 사용자 정보 설정
            } else {
                setUser(null); // 로그인된 사용자가 없으면 null로 설정
            }
        });

        return () => unsubscribe(); // cleanup 함수로 unsubscribe
    }, []);

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

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    // 로그인된 상태에서는 이미 로그인된 상태라고 알림
    if (user) {
        alert('이미 로그인된 상태입니다.');
        router.push('/main');
        return null; // 로그인된 상태면 렌더링하지 않음
    };

    return(
        <LoginContainer>
            <LoginTitle>로그인</LoginTitle>
            <LoginID><input type="text" placeholder="아이디를 입력하세요." value={email} onChange={(e) => setEmail(e.target.value)}/></LoginID>
            <LoginPW><input type="password" placeholder="비밀번호를 입력하세요." value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyDown}/></LoginPW>
            <LoginBtn onClick={handleLogin}>로그인</LoginBtn>
            <SignupFind>
                <span onClick={handleWriteClick}>회원가입</span>
                <span>아이디 / 비밀번호 찾기</span>
            </SignupFind>
        </LoginContainer>
    );
};