import React from 'react';
import Menu from './components/menu';
import { AuthProvider } from './context/AuthContext';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Menu />
      <Component {...pageProps} />
    </AuthProvider>
  );
}
