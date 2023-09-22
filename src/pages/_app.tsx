/* eslint-disable no-param-reassign */
/* eslint-disable simple-import-sort/imports */
import Header from '@/components/header/header';
import '../styles/global.css';

import type { AppProps } from 'next/app';
import Footer from '@/components/footer/footer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <main className="mb-auto">
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}

export default MyApp;
