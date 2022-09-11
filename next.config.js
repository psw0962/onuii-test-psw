/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['asset.seoltab.com'],
  },
};

module.exports = nextConfig;
