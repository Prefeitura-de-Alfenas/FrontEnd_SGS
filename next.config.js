/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    middleware: true, // Ativa o suporte a middleware
  },
};

module.exports = nextConfig;
