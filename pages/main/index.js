import { useRouter } from 'next/router';
import { Wrapper, Logo, Section, Section2, TitleSearch, Title, Search, PostList, Post, PostTitle, PostDate, PostAuthor, PostFooter, PostImage, WritePage } from '../../styles/emotion';

export default function Main(){
    const router = useRouter();

    const popularPosts = [
        { title: '냥이들 간식 후기 (추천)', author: '우돌이', date: '2024-05-12', views: 1830, heart: 30},
        { title: '사료 추천 부탁드립니다 !!', author: '코순왕자', date: '2024-04-13', views: 1330, heart: 30},
        { title: '고양이 발톱 깎을 때 팁 하나 알려드립니당 !', author: '몽실이', date: '2024-06-02', views: 1500, heart: 30},
        { title: '강아지 산책 코스 추천 (서울)', author: '돌이', date: '2024-03-08', views: 1200, heart: 30},
    ];

    const recentPosts = [
        { title: '우리집 귀염둥이 사진입니당', author: '다롱공주', date: '2024-06-05', views: 80, heart: 30},
        { title: '요즘 날씨가 너무 덥네요...', author: '뽀리', date: '2024-06-05', views: 50, heart: 30},
    ];

    const handleWriteClick = () => {
        router.push('/write');
    };

    return (
        <>
            <Logo>PetBuddy</Logo>
            <Wrapper>
                <Section>
                    <TitleSearch>
                        <Title>인기글</Title>
                        <Search src={`/search.svg`}/>
                    </TitleSearch>
                    <PostList>
                        {popularPosts.map((post, index) => (
                            <Post key={index}>
                                <PostImage src={`/basic.svg`} alt={post.title}/>
                                <PostTitle>{post.title}</PostTitle>
                                <PostAuthor>{post.author}</PostAuthor>
                                <PostDate>{post.date}</PostDate>
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
                            <PostImage src={`/basic.svg`} alt={post.title}/>
                            <PostTitle>{post.title}</PostTitle>
                            <PostAuthor>{post.author}</PostAuthor>
                            <PostDate>{post.date}</PostDate>
                            <PostFooter>
                                <span>조회수 {post.views}</span>
                                <span>♡ {post.heart}</span>
                            </PostFooter>
                        </Post>
                        ))}
                    </PostList>
                </Section2>
                <WritePage src="/add.svg" alt="Write" onClick={handleWriteClick}/>
            </Wrapper>
        </>
    );
};
