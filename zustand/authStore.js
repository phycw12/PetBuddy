import { create } from 'zustand';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const useAuthStore = create((set) => ({
    user: null,
    userData: null,
    setUser: (user) => set({ user }),
    setUserData: (userData) => set({ userData }),
    clearUser: () => set({ user: null, userData: null }),
}));

const unsubscribe = onAuthStateChanged(auth, async (user) => {
    const { setUser, setUserData, clearUser } = useAuthStore.getState();

    if (user) {
        try {
            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                setUser(user);
                setUserData(userDoc.data());
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