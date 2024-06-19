import { useState, useEffect } from 'react';
import { getStorage, getDownloadURL, ref } from 'firebase/storage';
import { Search } from '@/styles/emotion';

export default function SearchIcon() {
    const [loading, setLoading] = useState(true); // 이미지 로딩 상태
    const [searchImageUrl, setSearchImageUrl] = useState('');
    const storage = getStorage();
    
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const searchImageURL = await getDownloadURL(ref(storage, '/petbuddy/search.svg'));
                setSearchImageUrl(searchImageURL);

                setLoading(false); // 이미지 로딩 완료
            } catch (error) {
                console.error('Error fetching images:', error);
                setLoading(true); // 이미지 로딩 실패
            }
        };
        fetchImages();
    }, [storage]);

    if (loading) {
        return (
        <div>Loading...</div>);
    };

    return(
        <Search src={searchImageUrl} alt="Search Image"/>
    );
};