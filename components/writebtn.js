import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getStorage, getDownloadURL, ref } from 'firebase/storage';
import useAuthStore from '../zustand/authStore';
import { WritePage } from '@/styles/emotion';

export default function WriteBtn() {
    const router = useRouter();
    const { user } = useAuthStore();
    const storage = getStorage();
    const [addImageURL, setAddImageURL] = useState('');
    const [loading, setLoading] = useState(true); // 이미지 로딩 상태

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const addImageURL = await getDownloadURL(ref(storage, '/petbuddy/add.svg'));
                setAddImageURL(addImageURL);
                setLoading(false); // 이미지 로딩 완료
            } catch (error) {
                console.error('Error fetching images:', error);
                setLoading(false); // 이미지 로딩 실패
            }
        };
        fetchImages();
    }, [storage]);

    const handleWriteClick = () => {
        if (user) {
            router.push('/write');
        } else {
            alert('로그인이 필요합니다.');
            router.push('/login');
        }
    };

    if (loading) {
        return (
        <div>Loading...</div>);
      };  

    return (
        <WritePage src={addImageURL} alt="Write" onClick={handleWriteClick}/>
    );
};
