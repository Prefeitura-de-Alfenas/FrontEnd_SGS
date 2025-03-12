/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  swcMinify: true, // Reativando o SWC (melhor performance)
};

module.exports = nextConfig;
