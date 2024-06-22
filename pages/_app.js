import React from 'react';
import Menu from '@/components/menu';
import BackBtn from '@/components/backBtn';

export default function App({ Component, pageProps }) {
  return (
    <>
      <BackBtn/>
      <Menu/>
      <Component {...pageProps}/>
    </>
  );
}
