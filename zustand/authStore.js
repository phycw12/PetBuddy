import { create } from 'zustand';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const useAuthStore = create((set) => ({
    user: null,
    userData: null,
    nickname: '', // 닉네임 상태 추가
    profileImg: '', // 프로필 이미지 URL 상태 추가
    setUser: (user) => set({ user }),
    setUserData: (userData) => set({ userData }),
    setNickname: (nickname) => set({ nickname }), // 닉네임 설정 함수
    setProfileImg: (profileImg) => set({ profileImg }), // 프로필 이미지 설정 함수
    clearUser: () => set({ user: null, userData: null, nickname: '', profileImg: '' }), // 모든 상태 초기화 함수
}));

// Firebase의 인증 상태 변경 리스너
const unsubscribe = onAuthStateChanged(auth, async (user) => {
    const { setUser, setUserData, setNickname, setProfileImg, clearUser } = useAuthStore.getState();

    if (user) {
        try {
            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                setUser(user);
                setUserData(userDoc.data());
                setNickname(userDoc.data().nickname); // 닉네임 설정
                setProfileImg(userDoc.data().profileImg); // 프로필 이미지 URL 설정
            } else {
                console.error('사용자 문서가 존재하지 않습니다.');
                clearUser();
            }
        } catch (error) {
            console.error('사용자 데이터를 가져오는 중 오류가 발생했습니다.', error);
            clearUser();
        }
    } else {
        clearUser();
    }
});

const cleanup = () => unsubscribe();

export default useAuthStore;
export { cleanup };
