import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { getStorage, getDownloadURL, ref } from 'firebase/storage';
import { db } from '../../firebase';
import ReactMarkdown from 'react-markdown';
import { Wrapper, WriteHeader, Write, Section, MenuList, OrderBy, OrderByList, Menu, PostList, Post, PostTitle, PostContent, PostText, PostAuthor, CommentSection, PostFooterView, PostFooterComment } from '../../styles/emotion';
import SearchIcon from '@/components/search';
import Loading from '@/components/loading';

export default function Board() {
    const router = useRouter();
    const storage = getStorage();
    const [activeMenu, setActiveMenu] = useState('freeboard');
    const [posts, setPosts] = useState([]);
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
        async function fetchPosts() {
            setLoading(true); // 로딩 상태 시작
            const q = query(
                collection(db, 'posts'),
                where('category', '==', activeMenu),
                orderBy(sortOrder, 'desc')
            );
            const querySnapshot = await getDocs(q);
            const fetchedPosts = [];

            // 각 게시물의 댓글 수를 가져오는 부분
            for (const doc of querySnapshot.docs) {
                const postData = doc.data();
                const commentsQuerySnapshot = await getDocs(query(
                    collection(db, 'comments'),
                    where('postId', '==', doc.id)
                ));
                const commentsCount = commentsQuerySnapshot.size;
                fetchedPosts.push({ id: doc.id, commentsCount, ...postData });
            }

            setPosts(fetchedPosts);
            setLoading(false); // 로딩 상태 종료
        }
        fetchPosts();
    }, [sortOrder, activeMenu]);

    useEffect(() => {
        const handleScroll = () => {
            if (!loadingMore && window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
                setLoadingMore(true);
                const newVisiblePosts = visiblePosts + 5;
                if (newVisiblePosts <= posts.length) {
                    setTimeout(() => {
                        setVisiblePosts(newVisiblePosts);
                        setNextLoadIndex(newVisiblePosts);
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
    }, [visiblePosts, posts, loadingMore]);

    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
    };

    const handleSortOrderChange = (order) => {
        setSortOrder(order);
    };

    const handlePostClick = (postId) => {
        router.push(`/post/${postId}`);
    };

    const clickWriteBtn = () => {
        router.push('/write');
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

    // 이미지 스타일을 위한 컴포넌트 정의
    const components = {
        img: ({ src, alt }) => (
            <img src={src} alt={alt} style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }} />
        )
    };

    if (loading) {
        return <Loading/>;
    }

    return (
        <Wrapper>
            <Section>
                <SearchIcon />
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
                <WriteHeader>
                    <Write onClick={clickWriteBtn}>글쓰기</Write>
                </WriteHeader>
                <PostList>
                    {posts.slice(0, visiblePosts).map((post, index) => {
                        const imageUrls = extractImageUrls(post.content);
                        const postImage = imageUrls.length > 0 ? imageUrls[0] : basicImageUrl;
                        return (
                            <Post key={index} onClick={() => handlePostClick(post.id)}>
                                {/* <PostImage src={postImage} alt={post.title} /> */}
                                <PostContent>
                                    <PostTitle>{post.title}</PostTitle>
                                    <PostAuthor>{post.authorNickname}</PostAuthor>
                                    <PostText>
                                        <ReactMarkdown components={components}>
                                            {post.content.replace(/\n/g, '  \n')}
                                        </ReactMarkdown>
                                    </PostText>
                                </PostContent>
                                <CommentSection>
                                    <PostFooterView>조회수 {post.views}</PostFooterView>
                                    <PostFooterComment>💬 {post.commentsCount}</PostFooterComment>
                                </CommentSection>
                            </Post>
                        );
                    })}
                </PostList>
            </Section>
        </Wrapper>
    );
};
