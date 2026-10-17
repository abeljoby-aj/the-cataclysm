import type { NextConfig } from "next";

// Static export: deployable to Cloudflare Pages without a server runtime.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  reactStrictMode: true,
  transpilePackages: ["three"],
};

export default nextConfig;
