import { useState, useEffect  } from 'react';
import { useRouter } from 'next/router';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Wrapper, Section, Section2, TitleSearch, Title, Search, PostList, Post, PostTitleImg, PostTitle, PostDate, PostAuthor, PostFooter, PostImage, MenuList, Menu, DivisionLine } from '../../styles/emotion';
import WriteBtn from '../components/writebtn';

export default function Question() {
    const [activeMenu, setActiveMenu] = useState('궁금해요');
    const [popularPosts, setPopularPosts] = useState([]);
    const [recentPosts, setRecentPosts] = useState([]);
    const router = useRouter();

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
            const q = query(collection(db, 'posts'), where('category', '==', 'question'), orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);
            const posts = [];
            querySnapshot.forEach((doc) => {
                posts.push(doc.data());
            });
            setRecentPosts(posts);
        }
        fetchRecentPosts();
    }, []);

    const handleMenuClick = (menu, href) => {
        setActiveMenu(menu);
        router.push(href);
    };

    const handlePostClick = (postId) => {
        router.push(`/post/${postId}`);
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
                <DivisionLine/>
                <Section2>
                    <MenuList>
                        <Menu isActive={activeMenu === '자유게시판'} onClick={() => handleMenuClick('자유게시판', '/freeboard')}>자유게시판</Menu>
                        <Menu isActive={activeMenu === '공지사항'} onClick={() => handleMenuClick('공지사항', '/notice')}>공지사항</Menu>
                        <Menu isActive={activeMenu === '궁금해요'} onClick={() => handleMenuClick('궁금해요', '/question')}>궁금해요</Menu>
                        <Menu isActive={activeMenu === '사용후기'} onClick={() => handleMenuClick('사용후기', '/review')}>사용후기</Menu>
                    </MenuList>
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
