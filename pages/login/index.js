import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import useAuthStore from '@/zustand/authStore';
import { LoginContainer, LoginTitle, LoginID, LoginPW, LoginBtn, SignupFind } from '../../styles/emotion';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [localUser, setLocalUser] = useState(null); // 사용자 상태 추가
    const { setUser: setAuthUser } = useAuthStore(); // Zustand에서 사용자 상태 관리 함수

    const router = useRouter();

    useEffect(() => {
        // 사용자 로그인 상태 변경 감지
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user); // Zustand 스토어에 로그인된 사용자 정보 설정
                setLocalUser(user); // 로컬 상태에도 사용자 정보 설정
            } else {
                setAuthUser(null); // Zustand 스토어에서 로그인된 사용자가 없으면 null로 설정
                setLocalUser(null); // 로컬 상태에서도 사용자 정보를 초기화
            }
        });

        return () => unsubscribe(); // cleanup 함수로 unsubscribe
    }, []);

    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setAuthUser(userCredential.user); // Zustand 스토어에 사용자 정보 저장
            setLocalUser(userCredential.user); // 로컬 상태에도 사용자 정보 저장
            alert('로그인에 성공하였습니다.');
            router.push('/');
        } catch (error) {
            console.error('로그인 실패:', error);
            alert('이메일 또는 비밀번호가 올바르지 않습니다.');
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

    return (
        <LoginContainer>
            <LoginTitle>로그인</LoginTitle>
            <LoginID><input type="text" placeholder="아이디를 입력하세요." value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={handleKeyDown}/></LoginID>
            <LoginPW><input type="password" placeholder="비밀번호를 입력하세요." value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyDown}/></LoginPW>
            <LoginBtn onClick={handleLogin}>로그인</LoginBtn>
            <SignupFind>
                <span onClick={handleWriteClick}>회원가입</span>
                <span>아이디 / 비밀번호 찾기</span>
            </SignupFind>
        </LoginContainer>
    );
}
