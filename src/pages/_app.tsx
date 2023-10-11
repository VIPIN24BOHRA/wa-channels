/* eslint-disable no-param-reassign */
/* eslint-disable simple-import-sort/imports */
import Header from '@/components/header/header';
import '../styles/global.css';

import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import MainMenu from '@/components/mainMenu/mainMenu';
import { AuthProvider } from '@/context/authContext';
import { Toaster } from '@/components/ui/toaster';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  if (router.pathname === '/login' || router.pathname === '/privacy')
    return (
      <AuthProvider>
        <Component {...pageProps} />
        <Toaster />
      </AuthProvider>
    );
  if (router.pathname === '/')
    return (
      <AuthProvider>
        <Header />
        <main className="mb-auto">
          <Toaster />
          <Component {...pageProps} />
        </main>
      </AuthProvider>
    );
  return (
    <>
      <Header />
      <MainMenu />
      <main className="mb-auto">
        <Toaster />
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;
