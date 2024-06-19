import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth, db } from '../../firebase';
import { getStorage, getDownloadURL, ref } from 'firebase/storage';
import useAuthStore from '@/zustand/authStore';
import { doc, collection, where, query, getDoc, getDocs } from 'firebase/firestore';
import { MyPageContainer, MyPageSection1, MyPageSection1_1, NicknameLogout, MyPageNickname, Logout, MyPageId, MyPageSection2, MyPagePost, MyPageComment, MyPageSection3, MyPageSection3_1, MyPageSection3_2 } from '../../styles/emotion';
import ReactMarkdown from 'react-markdown';

export default function MyPage() {
    const { user, userData, nickname, setNickname } = useAuthStore();
    const router = useRouter();
    const [postCount, setPostCount] = useState(0);
    const [CommentCount, setCommentCount] = useState(0);
    const storage = getStorage();
    const [profileImageURL, setProfileImageURL] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setNickname(userData.nickname);

                    // 프로필 이미지 URL 설정
                    if (userData.profileImg) {
                        setProfileImageURL(userData.profileImg);
                    } else {
                        // 프로필 이미지가 없을 경우 기본 이미지 설정
                        const defaultImageRef = ref(storage, '/petbuddy/basic.svg');
                        const defaultImageURL = await getDownloadURL(defaultImageRef);
                        setProfileImageURL(defaultImageURL);
                    }
                } else {
                    console.error('사용자 데이터를 찾을 수 없습니다.');
                }
                setLoading(false); // 데이터 로딩 완료
            }
        };
        fetchUserData();
    }, [user, setNickname]);

    useEffect(() => {
        if (userData) {
            setNickname(userData.nickname);
        }
    }, [userData, setNickname]);

    useEffect(() => {
        if (user) {
            fetchPostCount();
            fetchCommentCount();
        }
    }, [user]);

    const fetchPostCount = async () => {
        try {
            const q = query(collection(db, 'posts'), where('authorId', '==', user.uid));
            const querySnapshot = await getDocs(q);
            const count = querySnapshot.size;
            setPostCount(count);
        } catch (error) {
            console.error('게시물 수 조회 중 오류:', error);
        }
    };

    const fetchCommentCount = async () => {
        try {
            const q = query(collection(db, 'comments'), where('authorId', '==', user.uid));
            const querySnapshot = await getDocs(q);
            const count = querySnapshot.size;
            setCommentCount(count);
        } catch (error) {
            console.error('게시물 수 조회 중 오류:', error);
        }
    };

    const handleLogout = async () => {
        try {
            await auth.signOut();
            alert('로그아웃에 성공하였습니다.');
            router.push('/');
        } catch (error) {
            console.error('로그아웃 중 오류 발생:', error);
            alert('로그아웃에 실패하였습니다.');
        }
    };

    const handlePostClick = (href) => {
        router.push(href);
    };
    
    // useEffect(() => {
    //     const fetchImages = async () => {
    //         try {
    //             const profileImageURL = await getDownloadURL(ref(storage, '/petbuddy/profile.svg'));
    //             setProfileImageURL(profileImageURL);
    //             setLoading(false); // 이미지 로딩 완료
    //         } catch (error) {
    //             console.error('Error fetching images:', error);
    //             setLoading(false); // 이미지 로딩 실패
    //         }
    //     };
    //     fetchImages();
    // }, [storage]);

    if (loading) {
        return (
        <div>Loading...</div>);
    };

    const components = {
        img: ({ src, alt }) => <img src={src} alt={alt} style={{ maxWidth: '200px', maxHeight: '100px', borderRadius: '50%' }} />
    };


    return (
        <MyPageContainer>
            <MyPageSection1>
                <MyPageSection1_1>
                    <ReactMarkdown components={components}>{`![Profile Image](${profileImageURL})`}</ReactMarkdown>
                    <NicknameLogout>
                        <MyPageNickname>{nickname || '닉네임 없음'}</MyPageNickname>
                        <MyPageId>{userData?.email || '아이디 없음'}</MyPageId>
                        <Logout onClick={handleLogout}>로그아웃</Logout>
                    </NicknameLogout>
                </MyPageSection1_1>
            </MyPageSection1>
            <MyPageSection2>
                <MyPagePost>
                    <span>작성글</span>
                    <span>{postCount}</span>
                </MyPagePost>
                <MyPageComment>
                    <span>작성댓글</span>
                    <span>{CommentCount}</span>
                </MyPageComment>
            </MyPageSection2>
            <MyPageSection3>
                <MyPageSection3_1>
                    <span onClick={() => handlePostClick('/mypage/postmanager')}>게시글 관리</span>
                    <span onClick={() => handlePostClick('/mypage/profilemanager')}>프로필 관리</span>
                </MyPageSection3_1>
                <MyPageSection3_2>
                    <span>알림</span>
                    <span>문의하기</span>
                </MyPageSection3_2>
            </MyPageSection3>
        </MyPageContainer>
    );
};
