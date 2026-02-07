import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'firebasestorage.googleapis.com' },
    ],
  },
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: '/proxy/getBooks',
        destination: 'https://us-central1-summaristt.cloudfunctions.net',
      },
    ];
  },
};


export default nextConfig;
