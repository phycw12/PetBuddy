import { useState } from 'react';
import { useRouter } from 'next/router';
import useAuthStore from '@/zustand/authStore';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { FindWrapper, FindInput, SearchButton, NoResults, ResultsList, ResultItem, ResultTitle, ResultContent } from '../../styles/emotion';

export default function Find() {
    const { user } = useAuthStore();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showNoResults, setShowNoResults] = useState(false);

    const handleSearch = async () => {
        if (searchTerm.length >= 1) {
            try {
                const postsRef = collection(db, 'posts');
                const snapshot = await getDocs(postsRef);
                let results = [];

                snapshot.forEach((doc) => {
                    const data = doc.data();
                    const titleMatch = data.title.toLowerCase().includes(searchTerm.toLowerCase());
                    const contentMatch = data.content.toLowerCase().includes(searchTerm.toLowerCase());
                    
                    if (titleMatch || contentMatch) {
                        results.push({ id: doc.id, ...data });
                    }
                });

                setSearchResults(results);

                if (results.length === 0) {
                    setShowNoResults(true);
                } else {
                    setShowNoResults(false);
                }
            } catch (error) {
                console.error('Error searching posts:', error);
            }
        } else {
            setSearchResults([]);
            setShowNoResults(false);
        }
    };

    const handlePostClick = (postId) => {
        if (user) {
            router.push(`/post/${postId}`);
        } else {
            alert('로그인이 필요합니다.');
            router.push('/login');
        }
    };

    return (
        <FindWrapper>
            <FindInput
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="검색어 입력..."
            />
            <SearchButton onClick={handleSearch}>Search</SearchButton>

            {showNoResults && (
                <NoResults>검색 결과가 없습니다.</NoResults>
            )}
            {searchResults.length > 0 && (
                <ResultsList>
                    {searchResults.map(post => (
                        <ResultItem key={post.id} onClick={() => handlePostClick(post.id)}>
                            <ResultTitle>{post.title}</ResultTitle>
                            <ResultContent>{post.content}</ResultContent>
                        </ResultItem>
                    ))}
                </ResultsList>
            )}
        </FindWrapper>
    );
};
