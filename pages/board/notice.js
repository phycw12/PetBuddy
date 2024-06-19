import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { getStorage, getDownloadURL, ref } from 'firebase/storage';
import { db } from '../../firebase';
import { Wrapper, TitleHeader, Section, MenuList, OrderBy, OrderByList, Menu, PostList, Post, PostTitleImg, PostTitle, PostDate, PostAuthor, PostFooter, PostImage } from '../../styles/emotion';
import WriteBtn from '@/components/writebtn';
import SearchIcon from '@/components/search';

export default function FreeBoard() {
    const [activeMenu, setActiveMenu] = useState('notice');
    const [recentPosts, setRecentPosts] = useState([]);
    const [sortOrder, setSortOrder] = useState('createdAt');
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
        async function fetchRecentPosts() {
            const q = query(collection(db, 'posts'), where('category', '==', 'notice'), orderBy(sortOrder, 'desc'));
            const querySnapshot = await getDocs(q);
            const posts = [];
            querySnapshot.forEach((doc) => {
                posts.push({ id: doc.id, ...doc.data() });
            });
            setRecentPosts(posts);
        }
        fetchRecentPosts();
    }, [sortOrder]);

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

    if (loading) {
        return (
        <div>Loading...</div>);
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
                    <TitleHeader>
                        <SearchIcon/>
                        <WriteBtn/>
                    </TitleHeader>
                    <PostList>
                        {recentPosts.map((post, index) => (
                            <Post key={index}>
                                <PostTitleImg onClick={() => handlePostClick(post.id)}>
                                    <PostImage src={basicImageUrl} alt={post.title} />
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
            </Wrapper>
        </>
    );
};
