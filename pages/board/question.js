import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Wrapper, Section, MenuList, OrderBy, OrderByList, Menu, PostList, Post, PostTitleImg, PostTitle, PostDate, PostAuthor, PostFooter, PostImage } from '../../styles/emotion';
import WriteBtn from '../components/writebtn';

export default function Question() {
    const [activeMenu, setActiveMenu] = useState('question');
    const [recentPosts, setRecentPosts] = useState([]);
    const [sortOrder, setSortOrder] = useState('createdAt');
    const router = useRouter();

    useEffect(() => {
        async function fetchRecentPosts() {
            const q = query(collection(db, 'posts'), where('category', '==', 'question'), orderBy(sortOrder, 'desc'));
            const querySnapshot = await getDocs(q);
            const posts = [];
            querySnapshot.forEach((doc) => {
                posts.push({ id: doc.id, ...doc.data() });
            });
            setRecentPosts(posts);
        }
        fetchRecentPosts();
    }, []);

    const handleMenuClick = (menu, href) => {
        setActiveMenu(menu);
        router.push(href);
    };

    const handleSortOrderChange = (order) => {
        setSortOrder(order);
    };

    const handlePostClick = (postId) => {
        router.push(`/post/${postId}`);
    };

    return (
        <>
            <Wrapper>
                <Section>
                    <MenuList>
                        <Menu isActive={activeMenu === 'freeboard'} onClick={() => handleMenuClick('freeboard', '/board/freeboard')}>자유게시판</Menu>
                        <Menu isActive={activeMenu === 'notice'} onClick={() => handleMenuClick('notice', '/board/notice')}>공지사항</Menu>
                        <Menu isActive={activeMenu === 'question'} onClick={() => handleMenuClick('question', '/board/question')}>궁금해요</Menu>
                        <Menu isActive={activeMenu === 'review'} onClick={() => handleMenuClick('review', '/board/review')}>사용후기</Menu>
                    </MenuList>
                    <OrderBy>
                        <OrderByList isActive={sortOrder === 'createdAt'} onClick={() => handleSortOrderChange('createdAt')}>최신순</OrderByList>
                        <OrderByList isActive={sortOrder === 'views'} onClick={() => handleSortOrderChange('views')}>조회순</OrderByList>
                    </OrderBy>
                    <PostList>
                        {recentPosts.map((post, index) => (
                            <Post key={index}>
                                <PostTitleImg onClick={() => handlePostClick(post.id)}>
                                    <PostImage src={`/basic.svg`} alt={post.title} />
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
                </Section>
                <WriteBtn/>
            </Wrapper>
        </>
    );
};
