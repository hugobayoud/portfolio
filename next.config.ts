import type { NextConfig } from 'next';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avenuedesinvestisseurs.fr',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
  },
  // The CV's favicon lives at `src/app/icon.ico` so the quiz can replace it —
  // see "The social preview" in CONTEXT.md. Keep the conventional URL working.
  rewrites: async () => [{ source: '/favicon.ico', destination: '/icon.ico' }],
};

export default nextConfig;
