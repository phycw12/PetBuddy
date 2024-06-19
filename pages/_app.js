import React from 'react';
import Menu from '@/components/menu';
import LogoTitle from '@/components/logo';

export default function App({ Component, pageProps }) {
  return (
    <>
      <LogoTitle/>
      <Menu/>
      <Component {...pageProps} />
    </>
  );
}
