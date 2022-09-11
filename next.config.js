/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withInterceptStdout = require('next-intercept-stdout');

const nextConfig = {};

module.exports = withInterceptStdout(
  {
    reactStrictMode: true,
    swcMinify: true,
    images: {
      domains: ['asset.seoltab.com'],
    },
  },
  (text) => (text.includes('Duplicate atom key') ? '' : text)
);
