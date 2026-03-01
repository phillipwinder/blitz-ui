import { createMDX } from "fumadocs-mdx/next"

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  outputFileTracingIncludes: {
    "/*": ["./registry/**/*", "./registry-blitz-ui/**/*", "./public/r/styles/**/*"],
  },
  experimental: {
    // Enable file system cache for development
    turbopackFileSystemCacheForDev: true,
    optimizePackageImports: [
      "lucide-react",
      "@tabler/icons-react",
      "@base-ui/react",
      "radix-ui",
      "motion",
      "jotai",
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    minimumCacheTTL: 2592000, // 30 days - reduce image re-optimizations
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "avatar.vercel.sh",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
  async headers() {
    const securityHeaders = [
      {
        key: "X-Content-Type-Options",
        value: "nosniff",
      },
      {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
      },
      {
        key: "X-DNS-Prefetch-Control",
        value: "on",
      },
    ]

    return [
      {
        // Registry JSON files: aggressive CDN caching to reduce edge requests
        source: "/r/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, s-maxage=31536000, stale-while-revalidate=31536000",
          },
          {
            key: "CDN-Cache-Control",
            value: "public, max-age=31536000, stale-while-revalidate=31536000",
          },
          {
            key: "Vercel-CDN-Cache-Control",
            value: "public, max-age=31536000, stale-while-revalidate=31536000",
          },
        ],
      },
      {
        // All pages: allow same-origin + approved external sites to embed in iframes
        source: "/(.*)",
        headers: [
          ...securityHeaders,
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' https://shoogle.dev https://*.shoogle.dev",
          },
        ],
      },
      {
        // API routes: block iframes entirely
        source: "/api/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'none'",
          },
        ],
      },
    ]
  },
  redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.blitz-ui.com" }],
        destination: "https://blitz-ui.com/:path*",
        permanent: true,
      },
    ]
  },
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
