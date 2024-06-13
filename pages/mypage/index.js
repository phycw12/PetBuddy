import { useRouter } from 'next/router';
import { auth } from '../firebase';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { MyPageContainer, MyPageSection1, MyPageSection1_1, NicknameLogout, ProfileImg, MyPageNickname, Logout, MyPageId, MyPageSection2, MyPagePost, MyPageComment, MyPageSection3, MyPageSection3_1, MyPageSection3_2 } from '../../styles/emotion';

export default function MyPage() {
    const { user, userData } = useAuth();
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
        <MyPageContainer>
            <MyPageSection1>
                <MyPageSection1_1>
                    <ProfileImg>프로필사진</ProfileImg>
                    <NicknameLogout>
                        <MyPageNickname>{userData?.nickname || '닉네임 없음'}</MyPageNickname>
                        <MyPageId>{userData?.email || '아이디 없음'}</MyPageId>
                        <Logout onClick={handleLogout}>로그아웃</Logout>
                    </NicknameLogout>
                </MyPageSection1_1>
            </MyPageSection1>
            <MyPageSection2>
                <MyPagePost>
                    <span>작성글</span>
                    <span>10</span>
                </MyPagePost>
                <MyPageComment>
                    <span>작성댓글</span>
                    <span>15</span>
                </MyPageComment>
            </MyPageSection2>
            <MyPageSection3>
                <MyPageSection3_1>
                    <span>게시글 관리</span>
                    <span>프로필 관리</span>
                </MyPageSection3_1>
                <MyPageSection3_2>
                    <span>알림</span>
                    <span>문의하기</span>
                </MyPageSection3_2>
            </MyPageSection3>
        </MyPageContainer>
    );
}
