/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  optimization: {
    minimize: false,
    minimizer: false,
  },
};

module.exports = nextConfig;
