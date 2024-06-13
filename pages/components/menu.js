import Link from 'next/link';
import { useRouter } from 'next/router';
import useAuthStore from '../zustand/authStore';
import { NavContainer, FixedNav, MenuItem, MenuIcon, MenuText } from '../../styles/emotion';

export default function Menu() {
    const { user } = useAuthStore();
    const router = useRouter();

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
                <MenuIcon src="/home.svg" alt="Home" />
                <MenuText>홈</MenuText>
              </MenuItem>
            </Link>
            <Link href="/freeboard" style={{ textDecoration: "none"}}>
              <MenuItem>
                <MenuIcon src="/board.svg" alt="Search" />
                <MenuText>게시판</MenuText>
              </MenuItem>
            </Link>
            <Link href="/chat" style={{ textDecoration: "none"}}>
              <MenuItem>
                <MenuIcon src="/chat.svg" alt="Chat" />
                <MenuText>채팅</MenuText>
              </MenuItem>
            </Link>
            <MenuItem onClick={handleWriteClick}>
              <MenuIcon src="/mypage.svg" alt="Profile" />
              <MenuText>마이페이지</MenuText>
            </MenuItem>
          </FixedNav>
      </NavContainer>
      );
};