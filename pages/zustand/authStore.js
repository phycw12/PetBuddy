import create from 'zustand';
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

// Initialize auth listener
onAuthStateChanged(auth, async (user) => {
    const setUser = useAuthStore.getState().setUser;
    const setUserData = useAuthStore.getState().setUserData;
    setUser(user);
    if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
            setUserData(userDoc.data());
        } else {
            console.error('사용자 문서가 존재하지 않습니다.');
        }
    } else {
        setUserData(null);
    }
});

export default useAuthStore;