import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuthStore from './zustand/authStore';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { getStorage, ref } from 'firebase/storage';
import { Wrapper, Section, Section2, TitleSearch, Title, Search, PostList, Post, PostTitleImg, PostTitle, PostDate, PostAuthor, PostFooter, PostImage } from '../styles/emotion';
import WriteBtn from './components/writebtn';


export default function Main(){
    const [popularPosts, setPopularPosts] = useState([]);
    const [recentPosts, setRecentPosts] = useState([]);
    const { user } = useAuthStore();
    const router = useRouter();
    const storage = getStorage();

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

    return (
        <>
            <Wrapper>
                <Section>
                    <TitleSearch>
                        <Title>인기글</Title>
                        <Search src={`/search.svg`}/>
                    </TitleSearch>
                    <PostList>
                        {popularPosts.map((post, index) => (
                            <Post key={index}>
                                <PostTitleImg onClick={() => handlePostClick(post.id)}>
                                    <PostImage src={`/basic.svg`} alt={post.title}/>
                                    <PostTitle>{post.title}</PostTitle>
                                </PostTitleImg>
                                <PostAuthor>{post.authorNickname}</PostAuthor>
                                <PostDate>{post.createdAt.toDate().toString()}</PostDate>
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
                                    <PostImage src={`/basic.svg`} alt={post.title} />
                                    <PostTitle>{post.title}</PostTitle>
                                </PostTitleImg>
                                <PostAuthor>{post.authorNickname}</PostAuthor>
                                <PostDate>{post.createdAt.toDate().toString()}</PostDate>
                                <PostFooter>
                                    <span>조회수 {post.views}</span>
                                    <span>♡</span>
                                </PostFooter>
                            </Post>
                        ))}
                    </PostList>
                </Section2>
                <WriteBtn/>
            </Wrapper>
        </>
    );
};
