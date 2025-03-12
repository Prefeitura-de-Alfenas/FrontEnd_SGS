/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Ignorar erros de build do TypeScript
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  // Desativar completamente o SWC
  swcMinify: false,
  webpack: (config, { isServer }) => {
    // Forçar webpack a usar Babel
    config.module.rules.push({
      test: /\.(js|jsx|ts|tsx)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["next/babel"],
        },
      },
    });
    return config;
  },
};

module.exports = nextConfig;
