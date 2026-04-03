import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // In Next.js 14.1+, this is the standard location for Server Action body limits.
  serverActions: {
    bodySizeLimit: '50mb',
  },
  // In some environments or older Next.js 14 versions, it might still look here.
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  } as any,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
