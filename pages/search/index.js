import { useState } from 'react';
import { useRouter } from 'next/router';
import useAuthStore from '@/zustand/authStore';
import { db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { FindWrapper } from '../../styles/emotion';

export default function Find() {
    const { user } = useAuthStore();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showNoResults, setShowNoResults] = useState(false);

    const handleSearch = async () => {
        if (searchTerm.length >= 2) {
            try {
                const postsRef = collection(db, 'posts');

                // title 필드에서 검색
                const titleQuery = query(postsRef, where('title', '>=', searchTerm), where('title', '<=', searchTerm + '\uf8ff'));

                // contents 필드에서 검색
                const contentsQuery = query(postsRef, where('content', '>=', searchTerm), where('content', '<=', searchTerm + '\uf8ff'));

                // 두 쿼리를 병합하여 실행
                const [titleSnapshot, contentsSnapshot] = await Promise.all([
                    getDocs(titleQuery),
                    getDocs(contentsQuery)
                ]);

                let results = [];

                // titleQuery 결과 처리
                titleSnapshot.forEach((doc) => {
                    results.push({ id: doc.id, ...doc.data() });
                });

                // contentsQuery 결과 처리 (중복된 결과는 제외)
                contentsSnapshot.forEach((doc) => {
                    const existsInResults = results.some(result => result.id === doc.id);
                    if (!existsInResults) {
                        results.push({ id: doc.id, ...doc.data() });
                    }
                });

                setSearchResults(results);

                // 검색 결과가 없는 경우 메시지 표시
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
            setShowNoResults(false); // 검색어가 2글자 미만이면 메시지 숨기기
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
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="검색어 입력..."
            />
            <button onClick={handleSearch}>Search</button>

            {showNoResults && (
                <div>검색 결과가 없습니다.</div>
            )}
            {searchResults.length > 0 && (
                <ul>
                    {searchResults.map(post => (
                        <li key={post.id}>
                            <h3 onClick={() => handlePostClick(post.id)}>{post.title}</h3>
                            <p onClick={() => handlePostClick(post.id)}>{post.content}</p>
                        </li>
                    ))}
                </ul>
            )}
        </FindWrapper>
    );
};
