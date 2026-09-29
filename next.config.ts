import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      // Real package/agency photos, uploaded via POST /upload on the backend.
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
        pathname: '/cdn/**',
      },
    ],
    // Next's image optimizer refuses to fetch from a private/local IP even
    // when the host is allow-listed above (SSRF protection) — the backend's
    // /cdn uploads already serve pre-optimized .webp, so there's nothing to
    // gain from re-optimizing, and this is what actually lets a real photo
    // render in dev. Revisit once the CDN host is a real public domain.
    unoptimized: true,
  },
};

export default nextConfig;
