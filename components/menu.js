import { useState } from 'react';
import { useRouter } from 'next/router';
import useAuthStore from '../zustand/authStore';
import { NavContainer, FixedNav, MenuItem, MenuIcon, MenuText } from '@/styles/emotion';
import { HiOutlineHome } from "react-icons/hi2";
import { IoPawSharp } from "react-icons/io5";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { GoPerson } from "react-icons/go";

export default function Menu() {
    const { user } = useAuthStore();
    const router = useRouter();
    const [activeMenu, setActiveMenu] = useState('/');

    const handleMenuClick = (menu) => {
      if (user) {
          setActiveMenu(menu);
          router.push(`${menu}`);
      } else {
          alert('로그인이 필요합니다.');
          router.push('/login');
      }
  };

    return (
      <NavContainer>
          <FixedNav>
            <MenuItem isActive={activeMenu === '/'} onClick={() => handleMenuClick('/')}>
              <HiOutlineHome className='MenuIcon'/>
              <MenuText>홈</MenuText>
            </MenuItem>
            <MenuItem isActive={activeMenu === '/board'} onClick={() => handleMenuClick('/board')}>
              <IoPawSharp className='MenuIcon'/>
              <MenuText>게시판</MenuText>
            </MenuItem>
            <MenuItem isActive={activeMenu === '/chat'} onClick={() => handleMenuClick('/chat')}>
              <IoChatbubbleEllipsesOutline className='MenuIcon'/>
              <MenuText>채팅</MenuText>
            </MenuItem>
            <MenuItem isActive={activeMenu === '/mypage'} onClick={() => handleMenuClick('/mypage')}>
              <GoPerson className='MenuIcon'/>
              <MenuText>마이페이지</MenuText>
            </MenuItem>
          </FixedNav>
      </NavContainer>
      );
};