import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.cooparroyocabral.com.ar',
        pathname: '/assets/img/**',
      },
      {
        protocol: 'https',
        hostname: 'lazosdesabores.com.ar',
      },
    ],
  },
};

export default nextConfig;
