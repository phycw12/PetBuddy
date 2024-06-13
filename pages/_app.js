import React from 'react';
import Menu from './components/menu';
import LogoTitle from './logo/logo';
import { AuthProvider } from './context/AuthContext';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <LogoTitle/>
      <Menu/>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
