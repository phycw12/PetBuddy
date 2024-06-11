import { useRouter } from 'next/router';
import { auth } from '../firebase';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function MyPage() {
    const { user } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await auth.signOut();
            alert('로그아웃에 성공하였습니다.');
            router.push('/main');
        } catch (error) {
            console.error('로그아웃 중 오류 발생:', error);
            alert('로그아웃에 실패하였습니다.');
        }
    };

    useEffect(() => {
        if (!user) {
            alert('로그인을 해주세요.');
            router.push('/login');
        }
    }, [user, router]);

    if (!user) {
        return null;
    }

    return (
        <button onClick={handleLogout}>로그아웃</button>
    );
};