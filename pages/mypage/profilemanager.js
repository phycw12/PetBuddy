import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuthStore from '@/zustand/authStore';
import { db, storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, getDoc, getDocs, updateDoc, query, where, collection } from 'firebase/firestore';
import { updatePassword } from 'firebase/auth';
import ReactMarkdown from 'react-markdown';
import { ProfileWrapper, ProfileHeader, ProfileImageContainer, ProfileImageUploadButton, ProfileNicknameInput, ProfilePasswordInput, ProfilePasswordConfirmInput, ProfileButtonContainer, ProfileButton, ProfileWithdrawButton } from '../../styles/emotion';

export default function ProfileManager() {
    const router = useRouter();
    const { user } = useAuthStore();
    const [profileImg, setProfileImg] = useState(null);
    const [profileImgUrl, setProfileImgUrl] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setNickname(userData.nickname);
                    setProfileImgUrl(userData.profileImg);
                }
            }
        };
        fetchUserData();
    }, [user]);

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setProfileImg(e.target.files[0]);
        }
    };

    const handleNicknameChange = (e) => setNickname(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

    const updateComments = async (userId, newNickname) => {
        const commentsQuery = query(collection(db, 'comments'), where('authorId', '==', userId));
        const commentsSnapshot = await getDocs(commentsQuery);
    
        const updatePromises = commentsSnapshot.docs.map(async (doc) => {
            const commentRef = doc.ref;
            await updateDoc(commentRef, { authorName: newNickname });
        });
    
        await Promise.all(updatePromises);
    };

    const updatePosts = async (userId, newNickname) => {
        const postsQuery = query(collection(db, 'posts'), where('authorId', '==', userId));
        const postsSnapshot = await getDocs(postsQuery);
    
        const updatePromises = postsSnapshot.docs.map(async (doc) => {
            const postRef = doc.ref;
            await updateDoc(postRef, { authorNickname: newNickname });
        });
    
        await Promise.all(updatePromises);
    };

    const handleUpdateProfile = async () => {
        if (user) {
            try {
                // 프로필 이미지 업데이트
                let updatedProfileImgUrl = profileImgUrl;
                if (profileImg) {
                    const storageRef = ref(storage, `profileImages/${user.uid}`);
                    await uploadBytes(storageRef, profileImg);
                    updatedProfileImgUrl = await getDownloadURL(storageRef);
                }

                // Firestore의 users 컬렉션 업데이트
                await updateDoc(doc(db, 'users', user.uid), {
                    nickname: nickname,
                    profileImg: updatedProfileImgUrl
                });

                // 댓글 업데이트
                await updateComments(user.uid, nickname);

                // 게시글 업데이트
                await updatePosts(user.uid, nickname);

                // 비밀번호 업데이트
                if (password && password === confirmPassword) {
                    await updatePassword(user, password);
                }

                alert('프로필이 성공적으로 업데이트되었습니다.');
                router.back();
            } catch (error) {
                console.error('프로필 업데이트 실패:', error);
                alert('프로필 업데이트에 실패하였습니다.');
            }
        }
    };

    // 컴포넌트 정의
    const components = {
        img: ({ src, alt }) => (
            <img src={src} alt={alt} style={{ maxWidth: '200px', maxHeight: '100px', borderRadius: '50%' }} />
        )
    };

    return (
        <ProfileWrapper>
            <ProfileHeader>{nickname} 님의 프로필</ProfileHeader>
            <ProfileImageContainer>
                <ReactMarkdown components={components}>{`![Profile Image](${profileImgUrl})`}</ReactMarkdown>
                <ProfileImageUploadButton>
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    프로필 수정 이미지 첨부 버튼
                </ProfileImageUploadButton>
            </ProfileImageContainer>
            <ProfileNicknameInput
                placeholder="닉네임 변경 input"
                value={nickname}
                onChange={handleNicknameChange}
            />
            <ProfilePasswordInput
                type="password"
                placeholder="비밀번호 변경 input"
                value={password}
                onChange={handlePasswordChange}
            />
            <ProfilePasswordConfirmInput
                type="password"
                placeholder="비밀번호 재확인 input"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
            />
            <ProfileButtonContainer>
                <ProfileButton onClick={() => router.back()}>취소</ProfileButton>
                <ProfileButton onClick={handleUpdateProfile}>확인</ProfileButton>
            </ProfileButtonContainer>
            <ProfileWithdrawButton>회원탈퇴</ProfileWithdrawButton>
        </ProfileWrapper>
    );
};
