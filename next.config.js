/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  env: {
    FIREBASE_PROJECT_ID: 'whatsapp-channels',
    FIREBASE_API_KEY: 'AIzaSyDTmeRRJ8NoEjGNdOhl3hsYgi7hf8rMjzE',
    FIREBASE_AUTH_DOMAIN: 'whatsapp-channels.firebaseapp.com',
    FIREBASE_APP_ID: '1:658907861993:web:fd1cce2b7d9469ad067178',
    FIREBASE_MEASUREMENT_ID: 'G-S6YSEB9EW3',
    FIREBASE_STORAGE_BUCKET: 'whatsapp-channels.appspot.com',
    FIREBASE_DATABASE_URL:
      'https://whatsapp-channels-default-rtdb.firebaseio.com',
  },
  eslint: {
    dirs: ['.'],
  },
  async redirects() {
    return [
      {
        source: '/wa',
        destination: 'https://wa.me/917818923807?text=Hello',
        permanent: true,
      },
      {
        source: '/to',
        destination: 'https://wa.me/917818923807?text=Hello',
        permanent: true,
      },
      {
        source: '/c/:secret',
        destination: '/confess?secret=:secret',
        permanent: true,
      },
      {
        source: '/buy/:secret',
        destination: '/premium?secret=:secret',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'secret.how',
          },
        ],
        destination: 'https://secretapp.net/:path*',
        permanent: true,
      },
    ];
  },
  poweredByHeader: false,
  trailingSlash: false,
  basePath: '',
  reactStrictMode: true,
});
