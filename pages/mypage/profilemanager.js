import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuthStore from '@/zustand/authStore';
import { db, storage, auth } from '../../firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { getAuth, deleteUser, signOut } from "firebase/auth";
import { doc, getDoc, updateDoc, query, where, collection, getDocs, deleteDoc } from 'firebase/firestore';
import { updatePassword } from 'firebase/auth';
import ReactMarkdown from 'react-markdown';
import { ProfileWrapper, ProfileHeader, ProfileImageContainer, ProfileImageUploadButton, ProfileImageDeleteButton, ProfileNicknameInput, ProfilePasswordInput, ProfilePasswordConfirmInput, ProfileButtonContainer, ProfileButton, ProfileWithdrawButton } from '../../styles/emotion';

export default function ProfileManager() {
    const router = useRouter();
    const { user, nickname: stateNickname, setNickname } = useAuthStore();
    const [profileImg, setProfileImg] = useState(null);
    const [profileImgUrl, setProfileImgUrl] = useState("");
    const [nickname, setLocalNickname] = useState(stateNickname); 
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                try {
                    const userDoc = await getDoc(doc(db, 'users', user.uid));
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setLocalNickname(userData.nickname);

                        // 프로필 이미지 URL 설정
                        if (userData.profileImg) {
                            setProfileImgUrl(userData.profileImg);
                        } else {
                            // 프로필 이미지가 없을 경우 기본 이미지 설정
                            const defaultImageRef = ref(storage, '/petbuddy/basic.svg');
                            const defaultImageURL = await getDownloadURL(defaultImageRef);
                            setProfileImgUrl(defaultImageURL);
                        }
                    } else {
                        console.error('사용자 데이터를 찾을 수 없습니다.');
                    }
                } catch (error) {
                    console.error('사용자 데이터를 가져오는 중 오류 발생:', error);
                } finally {
                    setLoading(false); // 데이터 로딩 완료
                }
            }
        };
        fetchUserData();
    }, [user, setNickname]);

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setProfileImg(e.target.files[0]);
        }
    };

    const handleImageDelete = async () => {
        const defaultImagePath = '/petbuddy/basic.svg';
        const defaultImageRef = ref(storage, defaultImagePath);
        const defaultImageURL = await getDownloadURL(defaultImageRef);
    
        if (user && profileImgUrl) {
            if (profileImgUrl === defaultImageURL) {
                alert('기본 이미지는 삭제할 수 없습니다.');
                return;
            }
    
            try {
                // 프로필 이미지 삭제
                const imageRef = ref(storage, profileImgUrl); // 이미지 경로를 사용하여 ref 생성
                await deleteObject(imageRef);
    
                // Firestore의 users 컬렉션 업데이트 (프로필 이미지 삭제)
                await updateDoc(doc(db, 'users', user.uid), {
                    profileImg: null
                });
    
                // 기본 이미지 URL로 설정
                setProfileImgUrl(defaultImageURL);
    
                alert('프로필 이미지가 삭제되었습니다.');
            } catch (error) {
                console.error('프로필 이미지 삭제 실패:', error);
                alert('프로필 이미지 삭제에 실패하였습니다.');
            }
        }
    };

    const handleNicknameChange = (e) => setLocalNickname(e.target.value);
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
                router.reload();
            } catch (error) {
                console.error('프로필 업데이트 실패:', error);
                alert('프로필 업데이트에 실패하였습니다.');
            }
        }
    };

    const extractImageUrls = (content) => {
        const regex = /!\[.*?\]\((.*?)\)/g; // Markdown 이미지 링크 형식: ![alt](url)
        let matches;
        const urls = [];
        while ((matches = regex.exec(content)) !== null) {
            urls.push(matches[1]);
        }
        return urls;
    };

    // 회원 탈퇴

    const deleteUserData = async (userId) => {
        try {
            // 1. Firestore에서 사용자 데이터 삭제
            await deleteDoc(doc(db, 'users', userId));
            console.log('User data deleted from Firestore');
    
            // 2. Firestore에서 사용자가 작성한 게시글 및 댓글 삭제
            const postsQuery = query(collection(db, 'posts'), where('authorId', '==', userId));
            const postsSnapshot = await getDocs(postsQuery);
    
            if (!postsSnapshot.empty) { // 게시글 데이터가 있는 경우에만 실행
                const deletePostPromises = postsSnapshot.docs.map(async (postDoc) => {
                    const postData = postDoc.data();
                    
                    // 게시글 내용에서 이미지 URL 추출 및 삭제
                    const imageUrls = extractImageUrls(postData.content); // content에서 이미지 링크를 추출하는 함수
    
                    const deleteImagePromises = imageUrls.map((imageUrl) => {
                        const imageRef = ref(storage, imageUrl);
                        return deleteObject(imageRef);
                    });
                    await Promise.all(deleteImagePromises);
    
                    // 게시글에 첨부된 이미지 삭제
                    if (postData.imageUrl) {
                        const imageRef = ref(storage, postData.imageUrl);
                        await deleteObject(imageRef);
                    }
                    
                    // 게시글 삭제
                    await deleteDoc(postDoc.ref);
                });
    
                await Promise.all(deletePostPromises);
                console.log('User posts and associated images deleted from Firestore and Storage');
            }
    
            const commentsQuery = query(collection(db, 'comments'), where('authorId', '==', userId));
            const commentsSnapshot = await getDocs(commentsQuery);
    
            if (!commentsSnapshot.empty) { // 댓글 데이터가 있는 경우에만 실행
                const deleteCommentPromises = commentsSnapshot.docs.map(async (commentDoc) => {
                    await deleteDoc(commentDoc.ref);
                });
    
                await Promise.all(deleteCommentPromises);
                console.log('User comments deleted from Firestore');
            }
    
           // 3. Storage에서 사용자 프로필 이미지 삭제
            const profileImgRef = ref(storage, `profileImages/${userId}`);
            const profileImgSnapshot = await getDownloadURL(profileImgRef);

            if (profileImgSnapshot) {
                await deleteObject(profileImgRef);
                console.log('User profile image deleted from Storage');
            }
        } catch (error) {
            console.error('Error deleting user data: ', error);
        }
    };
    
    const deleteCurrentUser = async () => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            try {
                await deleteUserData(user.uid); // Firestore 및 Storage에서 데이터 삭제
                await deleteUser(user); // Firebase Authentication에서 사용자 삭제
                console.log('User deleted successfully');
            } catch (error) {
                console.error('Error deleting user: ', error);
            }
        } else {
            console.log('No user is currently signed in');
        }
    };
    
    // 컴포넌트 내에서 호출 예시
    const handleDeleteAccount = async () => {
        const confirmDelete = window.confirm('정말 탈퇴하시겠습니까?');
        if (confirmDelete) {
            await deleteCurrentUser();
            alert('회원 탈퇴가 완료되었습니다.');
            await signOut(auth);
            router.push('/');
        }
    };

    // Markdown 컴포넌트 정의
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
                    프로필 사진
                </ProfileImageUploadButton>
                {profileImgUrl && (
                    <ProfileImageDeleteButton onClick={handleImageDelete}>
                        프로필 삭제
                    </ProfileImageDeleteButton>
                )}
            </ProfileImageContainer>
            <ProfileNicknameInput
                placeholder="닉네임 변경 input"
                value={nickname}
                onChange={handleNicknameChange}
            />
            <ProfilePasswordInput
                type="password"
                placeholder="비밀번호 변경"
                value={password}
                onChange={handlePasswordChange}
            />
            <ProfilePasswordConfirmInput
                type="password"
                placeholder="비밀번호 확인"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
            />
            <ProfileButtonContainer>
                <ProfileButton onClick={() => router.back()}>취소</ProfileButton>
                <ProfileButton onClick={handleUpdateProfile}>확인</ProfileButton>
            </ProfileButtonContainer>
            <ProfileWithdrawButton onClick={handleDeleteAccount}>회원탈퇴</ProfileWithdrawButton>
        </ProfileWrapper>
    );
};
