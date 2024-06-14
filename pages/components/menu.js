import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getStorage, getDownloadURL, ref } from 'firebase/storage';
import useAuthStore from '../zustand/authStore';
import { NavContainer, FixedNav, MenuItem, MenuIcon, MenuText } from '../../styles/emotion';

export default function Menu() {
    const { user } = useAuthStore();
    const router = useRouter();
    const storage = getStorage();
    const [homeImageURL, setHomeImageURL] = useState('');
    const [freeboardImageURL, setFreeboardImageURL] = useState('');
    const [chatImageURL, setChatImageURL] = useState('');
    const [mypageImageURL, setMypageImageURL] = useState('');

    useEffect(() => {
      const fetchImages = async () => {
          try {
              const homeImageURL = await getDownloadURL(ref(storage, '/petbuddy/home.svg'));
              setHomeImageURL(homeImageURL);

              const freeboardImageURL = await getDownloadURL(ref(storage, '/petbuddy/board.svg'));
              setFreeboardImageURL(freeboardImageURL);

              const chatImageURL = await getDownloadURL(ref(storage, '/petbuddy/chat.svg'));
              setChatImageURL(chatImageURL);

              const mypageImageURL = await getDownloadURL(ref(storage, '/petbuddy/mypage.svg'));
              setMypageImageURL(mypageImageURL);

          } catch (error) {
              console.error('Error fetching images:', error);
          }
      };

      fetchImages();
  }, [storage]);


    const handleWriteClick = () => {
      if (user) {
          router.push('/mypage');
      } else {
          alert('로그인이 필요합니다.');
          router.push('/login');
      }
  };

    return (
      <NavContainer>
          <FixedNav>
            <Link href="/" style={{ textDecoration: "none"}}>
              <MenuItem>
                <MenuIcon src={homeImageURL} alt="Home" />
                <MenuText>홈</MenuText>
              </MenuItem>
            </Link>
            <Link href="/board/freeboard" style={{ textDecoration: "none"}}>
              <MenuItem>
                <MenuIcon src={freeboardImageURL} alt="Search" />
                <MenuText>게시판</MenuText>
              </MenuItem>
            </Link>
            <Link href="/chat" style={{ textDecoration: "none"}}>
              <MenuItem>
                <MenuIcon src={chatImageURL} alt="Chat" />
                <MenuText>채팅</MenuText>
              </MenuItem>
            </Link>
            <MenuItem onClick={handleWriteClick}>
              <MenuIcon src={mypageImageURL} alt="Profile" />
              <MenuText>마이페이지</MenuText>
            </MenuItem>
          </FixedNav>
      </NavContainer>
      );
};