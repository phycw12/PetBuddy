import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuthStore from '@/zustand/authStore';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { getStorage, getDownloadURL, ref } from 'firebase/storage';
import { MainWrapper, Section, Section2, Title, TitleHeader, PostList, Post, PostTitleImg, PostTitle, PostDate, PostAuthor, PostFooter, PostImage } from '../styles/emotion';
import LogoTitle from '@/components/logo';
import WriteBtn from '@/components/writebtn';
import SearchIcon from '@/components/search';

export default function Main(){
    const [popularPosts, setPopularPosts] = useState([]);
    const [recentPosts, setRecentPosts] = useState([]);
    const { user } = useAuthStore();
    const router = useRouter();
    const storage = getStorage();
    const [basicImageUrl, setBasicImageUrl] = useState('');
    const [loading, setLoading] = useState(true); // 이미지 로딩 상태

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const basicImageURL = await getDownloadURL(ref(storage, '/petbuddy/basic.svg'));
                setBasicImageUrl(basicImageURL);

                setLoading(false); // 이미지 로딩 완료
            } catch (error) {
                console.error('Error fetching images:', error);
                setLoading(true); // 이미지 로딩 실패
            }
        };

        fetchImages();
    }, [storage]);

    useEffect(() => {
        async function fetchPopularPosts() {
            const q = query(collection(db, 'posts'),
                            orderBy('views', 'desc'),
                            limit(2)); // 조회수가 가장 높은 2개의 글 가져오기
            const querySnapshot = await getDocs(q);
            const posts = [];
            querySnapshot.forEach((doc) => {
                posts.push({ id: doc.id, ...doc.data() });
            });
            setPopularPosts(posts);
        }
        fetchPopularPosts();
    }, []);

    useEffect(() => {
        async function fetchRecentPosts() {
            const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(4));
            const querySnapshot = await getDocs(q);
            const posts = [];
            querySnapshot.forEach((doc) => {
                posts.push({ id: doc.id, ...doc.data() });
            });
            setRecentPosts(posts);
        }
        fetchRecentPosts();
    }, []);

    const handlePostClick = (postId) => {
        if (user) {
            router.push(`/post/${postId}`);
        } else {
            alert('로그인이 필요합니다.');
            router.push('/login');
        }
    };

    if (loading) {
        return (
            <div>Loading...</div>
        );
    };

    return (
        <>
            <LogoTitle/>
            <MainWrapper>
                <Section>
                    <Title>인기글</Title>
                    <TitleHeader>
                        <SearchIcon/>
                        <WriteBtn/>
                    </TitleHeader>
                <PostList>
                    {popularPosts.map((post, index) => (
                        <Post key={index}>
                            <PostTitleImg onClick={() => handlePostClick(post.id)}>
                                <PostImage src={basicImageUrl} alt={post.title}/>
                                <PostTitle>{post.title}</PostTitle>
                            </PostTitleImg>
                            <PostAuthor>{post.authorNickname}</PostAuthor>
                            <PostDate>
                                {new Intl.DateTimeFormat('ko-KR', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false,
                            }).format(post.createdAt.toDate())}
                            </PostDate>
                            <PostFooter>
                                <span>조회수 {post.views}</span>
                                <span>♡ {post.heart}</span>
                            </PostFooter>
                        </Post>
                    ))}
                </PostList>
                </Section>
                <Section2>
                   <Title>최신글</Title>
                    <PostList>
                        {recentPosts.map((post, index) => (
                            <Post key={index}>
                                <PostTitleImg onClick={() => handlePostClick(post.id)}>
                                    <PostImage src={basicImageUrl} alt={post.title}/>
                                    <PostTitle>{post.title}</PostTitle>
                                </PostTitleImg>
                                <PostAuthor>{post.authorNickname}</PostAuthor>
                                <PostDate>
                                    {new Intl.DateTimeFormat('ko-KR', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: false,
                                    }).format(post.createdAt.toDate())}
                                </PostDate>
                                <PostFooter>
                                    <span>조회수 {post.views}</span>
                                    <span>♡</span>
                                </PostFooter>
                            </Post>
                        ))}
                    </PostList>
                </Section2>
            </MainWrapper>
        </>
    );
};
