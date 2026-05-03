import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // Disable experimental features for stable builds
  experimental: {
    // optimizePackageImports: ["@react-three/fiber", "@react-three/drei"],
  },
};

export default nextConfig;
