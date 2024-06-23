import { useState } from 'react';
import { useRouter } from 'next/router';
import { TitleHeader, SearchInput } from '@/styles/emotion';
import { IoIosSearch } from "react-icons/io";

export default function SearchIcon() {
    const router = useRouter();

    const handleSearchClick = () => {
        router.push('/search');
    };

    return(
        <TitleHeader onClick={handleSearchClick}>
            <SearchInput/>
            <IoIosSearch className='searchIcon'/>
        </TitleHeader>
    );
};