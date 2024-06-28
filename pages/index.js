import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuthStore from '@/zustand/authStore';
import { collection, query, orderBy, getDocs, where } from 'firebase/firestore';
import { db } from '../firebase';
import { getStorage, getDownloadURL, ref } from 'firebase/storage';
import { Wrapper, Section, OrderBy, OrderByList, PostList, Post, PostTitleImg, PostTitle, PostDate, PostAuthor, PostFooter, PostImage, PostFooterView, PostFooterComment } from '../styles/emotion';
import LogoTitle from '@/components/logo';
import SearchIcon from '@/components/search';
import Loading from '@/components/loading';

export default function Main() {
    const [popularPosts, setPopularPosts] = useState([]);
    const [recentPosts, setRecentPosts] = useState([]);
    const { user } = useAuthStore();
    const router = useRouter();
    const storage = getStorage();
    const [basicImageUrl, setBasicImageUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [visiblePosts, setVisiblePosts] = useState(5);
    const [loadingMore, setLoadingMore] = useState(false);
    const [sortOrder, setSortOrder] = useState('createdAt');

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
        async function fetchPosts() {
            setLoading(true); // 로딩 상태 시작
            const q = query(
                collection(db, 'posts'),
                orderBy(sortOrder, 'desc')
            );
            const querySnapshot = await getDocs(q);
            const posts = [];

            // 각 게시물의 댓글 수를 가져오는 부분
            for (const doc of querySnapshot.docs) {
                const postData = doc.data();
                const commentsQuerySnapshot = await getDocs(query(
                    collection(db, 'comments'),
                    where('postId', '==', doc.id)
                ));
                const commentsCount = commentsQuerySnapshot.size;
                posts.push({ id: doc.id, commentsCount, ...postData });
            }

            if (sortOrder === 'createdAt') {
                setRecentPosts(posts);
            } else {
                setPopularPosts(posts);
            }

            setLoading(false); // 로딩 상태 종료
        }

        fetchPosts();
    }, [sortOrder]);

    useEffect(() => {
        const handleScroll = () => {
            if (!loadingMore && window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
                setLoadingMore(true);
                const newVisiblePosts = visiblePosts + 5;
                if (newVisiblePosts <= recentPosts.length) {
                    setTimeout(() => {
                        setVisiblePosts(newVisiblePosts);
                        setLoadingMore(false);
                    }, 1000);
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

    const handlePostClick = (postId) => {
        if (user) {
            router.push(`/post/${postId}`);
        } else {
            alert('로그인이 필요합니다.');
            router.push('/login');
        }
    };

    const handleSortOrderChange = (order) => {
        setSortOrder(order);
    };

    const extractImageUrls = (content) => {
        const regex = /!\[.*?\]\((.*?)\)/g; // Markdown 이미지 링크 형식: ![alt](url)
        let matches;
        const urls = [];
        while ((matches = regex.exec(content)) !== null) {
            urls.push(matches[1]);
        }
        return urls;
    };

    if (loading) {
        return <Loading />;
    };

    const postsToDisplay = sortOrder === 'createdAt' ? recentPosts : popularPosts;

    return (
        <>
            <LogoTitle />
            <Wrapper>
                <Section>
                    <SearchIcon />
                    <OrderBy>
                        <OrderByList isActive={sortOrder === 'createdAt'} onClick={() => handleSortOrderChange('createdAt')}>최신순</OrderByList>
                        <OrderByList isActive={sortOrder === 'views'} onClick={() => handleSortOrderChange('views')}>인기순</OrderByList>
                    </OrderBy>
                    <PostList>
                        {postsToDisplay.slice(0, visiblePosts).map((post, index) => {
                            const imageUrls = extractImageUrls(post.content);
                            const postImage = imageUrls.length > 0 ? imageUrls[0] : basicImageUrl;
                            return (
                                <Post key={index} onClick={() => handlePostClick(post.id)}>
                                    <PostTitleImg>
                                        <PostImage src={postImage} alt={post.title} />
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
                                        <PostFooterView>조회수 {post.views}</PostFooterView>
                                        <PostFooterComment>💬 {post.commentsCount}</PostFooterComment>
                                        {/* <PostFooterHeart>♡ {post.heart}</PostFooterHeart> */}
                                    </PostFooter>
                                </Post>
                            );
                        })}
                    </PostList>
                </Section>
            </Wrapper>
        </>
    );
};
