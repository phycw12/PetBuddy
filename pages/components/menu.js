import Link from 'next/link';
import { FixedNav, MenuItem, MenuIcon, MenuText } from '../../styles/emotion';

export default function Menu() {
    return (
        <FixedNav>
          <Link href="/main" style={{ textDecoration: "none"}}>
            <MenuItem>
              <MenuIcon src="/home.svg" alt="Home" />
              <MenuText>홈</MenuText>
            </MenuItem>
          </Link>
          <Link href="/board" style={{ textDecoration: "none"}}>
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
          <Link href="/mypage" style={{ textDecoration: "none"}}>
            <MenuItem>
              <MenuIcon src="/mypage.svg" alt="Profile" />
              <MenuText>마이페이지</MenuText>
            </MenuItem>
          </Link>
        </FixedNav>
      );
};