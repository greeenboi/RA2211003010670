import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  //unsplash is peak image lib
  images:{
    remotePatterns:[
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      }
    ]
  }
};

export default nextConfig;
