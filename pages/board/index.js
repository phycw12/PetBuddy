import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { getStorage, getDownloadURL, ref } from 'firebase/storage';
import { db } from '../../firebase';
import { Wrapper, TitleHeader, BoardSection, MenuList, OrderBy, OrderByList, Menu, PostList, Post, PostTitle, PostContent, PostText, PostAuthor, PostImage, CommentSection, CommentIcon, CommentCount} from '../../styles/emotion';
import WriteBtn from '@/components/writebtn';
import SearchIcon from '@/components/search';
import Loading from '@/components/loading';

export default function FreeBoard() {
    const router = useRouter();
    const storage = getStorage();
    const [activeMenu, setActiveMenu] = useState('freeboard');
    const [recentPosts, setRecentPosts] = useState([]);
    const [sortOrder, setSortOrder] = useState('createdAt');
    const [basicImageUrl, setBasicImageUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [visiblePosts, setVisiblePosts] = useState(5); // 초기에 보여질 게시물 수
    const [nextLoadIndex, setNextLoadIndex] = useState(5); // 다음에 로드할 게시물의 시작 인덱스
    const [loadingMore, setLoadingMore] = useState(false);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const basicImageURL = await getDownloadURL(ref(storage, '/petbuddy/basic.svg'));
                setBasicImageUrl(basicImageURL);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching images:', error);
                setLoading(true);
            }
        };

        fetchImages();
    }, [storage]);

    useEffect(() => {
        async function fetchRecentPosts() {
            const q = query(
                collection(db, 'posts'),
                where('category', '==', activeMenu),
                orderBy(sortOrder, 'desc')
            );
            const querySnapshot = await getDocs(q);
            const posts = [];
            querySnapshot.forEach((doc) => {
                posts.push({ id: doc.id, ...doc.data() });
            });
            setRecentPosts(posts);
        }
        fetchRecentPosts();
    }, [sortOrder, activeMenu]);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop
                === document.documentElement.offsetHeight
            ) {
                // 사용자가 스크롤을 끝까지 내림
                const newVisiblePosts = visiblePosts + 5; // 추가로 보일 게시물 수
                if (newVisiblePosts <= recentPosts.length) {
                    setVisiblePosts(newVisiblePosts);
                }
            }
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [visiblePosts, recentPosts]);

    useEffect(() => {
        const handleScroll = () => {
            if (
                !loadingMore &&
                window.innerHeight + document.documentElement.scrollTop
                === document.documentElement.offsetHeight
            ) {
                setLoadingMore(true);
                const newVisiblePosts = visiblePosts + 5;
                if (newVisiblePosts <= recentPosts.length) {
                    setTimeout(() => {
                        setVisiblePosts(newVisiblePosts);
                        setLoadingMore(false);
                    }, 1000); // 예시로 1초 후에 로딩 상태 해제
                } else {
                    setLoadingMore(false);
                }
            }
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [visiblePosts, recentPosts, loadingMore]);

    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
    };

    const handleSortOrderChange = (order) => {
        setSortOrder(order);
    };

    const handlePostClick = (postId) => {
        router.push(`/post/${postId}`);
    };

    if (loading) {
        return (
            <Loading/>
        );
    };

    return (
        <Wrapper>
            <BoardSection>
                <SearchIcon/>
                <MenuList>
                    <Menu isActive={activeMenu === 'freeboard'} onClick={() => handleMenuClick('freeboard')}>멍냥멍냥</Menu>
                    <Menu isActive={activeMenu === 'notice'} onClick={() => handleMenuClick('notice')}>공지사항</Menu>
                    <Menu isActive={activeMenu === 'question'} onClick={() => handleMenuClick('question')}>궁금해요</Menu>
                    <Menu isActive={activeMenu === 'review'} onClick={() => handleMenuClick('review')}>사용후기</Menu>
                </MenuList>
                <OrderBy>
                    <OrderByList isActive={sortOrder === 'createdAt'} onClick={() => handleSortOrderChange('createdAt')}>최신순</OrderByList>
                    <OrderByList isActive={sortOrder === 'views'} onClick={() => handleSortOrderChange('views')}>인기순</OrderByList>
                </OrderBy>
                <TitleHeader>
                    <WriteBtn />
                </TitleHeader>
                <PostList>
                    {recentPosts.slice(0, visiblePosts).map((post, index) => (
                        <Post key={index} onClick={() => handlePostClick(post.id)}>
                            <PostImage src={basicImageUrl} alt={post.title}/>
                            <PostContent>
                                <PostTitle>{post.title}</PostTitle>
                                <PostAuthor>{post.authorNickname}</PostAuthor>
                                <PostText>{post.content}</PostText>
                            </PostContent>
                            <CommentSection>
                                <CommentIcon>💬</CommentIcon>
                                <CommentCount>댓글수</CommentCount>
                            </CommentSection>
                        </Post>
                    ))}
                </PostList>
            </BoardSection>
        </Wrapper>
    );
};
