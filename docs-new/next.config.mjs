import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  output: 'standalone',
  reactStrictMode: true,
  rewrites() {
    return [
      {
        source: '/docs/:path*.md',
        destination: '/api/docs/:path*',
      },
      {
        source: '/llms.txt',
        destination: '/api/llms',
      },
    ];
  },
  redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.blitz-ui.com' }],
        destination: 'https://blitz-ui.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default withMDX(config);
