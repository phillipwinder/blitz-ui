import { createMDX } from "fumadocs-mdx/next"

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
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
  devIndicators: false,
  transpilePackages: ["@blitz-ui/react"],
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
