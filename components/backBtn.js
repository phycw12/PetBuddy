import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getStorage, getDownloadURL, ref } from 'firebase/storage';
import { Back, BackImg } from '@/styles/emotion';

export default function BackBtn() {
    const [loading, setLoading] = useState(true); // 이미지 로딩 상태
    const [backImageUrl, setBackImageUrl] = useState('');
    const router = useRouter();
    const storage = getStorage();

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const backImageUrl = await getDownloadURL(ref(storage, '/petbuddy/back.svg'));
                setBackImageUrl(backImageUrl);

                setLoading(false); // 이미지 로딩 완료
            } catch (error) {
                console.error('Error fetching images:', error);
                setLoading(true); // 이미지 로딩 실패
            }
        };
        fetchImages();
    }, [storage]);

    const backClick = () => {
        router.back();
    };

    if (loading) {
        return null;
    };
    
    return(
        <Back>
            <BackImg src={backImageUrl} alt="Back" onClick={backClick}/>
        </Back>
    );
};