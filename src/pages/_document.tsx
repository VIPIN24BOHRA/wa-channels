import Document, { Head, Html, Main, NextScript } from 'next/document';

import { AppConfig } from '@/utils/AppConfig';

// Need to create a custom _document because i18n support is not compatible with `next export`.
class MyDocument extends Document {
  // eslint-disable-next-line class-methods-use-this
  render() {
    const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
    return (
      <Html lang={AppConfig.locale}>
        <Head>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GTM_ID}', {
                page_path: window.location.pathname,
              });
            `,
            }}
          />
          <script async src="/twitterScript.js" />
          <script async src="/facebookScript.js" />
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src="https://www.facebook.com/tr?id=642928041160522&ev=PageView&noscript=1"
            />
          </noscript>
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Outfit:wght@200;300;400;500;600;700;800&family=Pacifico&family=Red+Hat+Display:ital,wght@0,700;0,900;1,500&family=Rubik+Distressed&family=Rubik:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Satisfy&display=swap"
            rel="stylesheet"
          ></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
