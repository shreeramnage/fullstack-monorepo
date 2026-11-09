import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Source-only internal packages are compiled by Next.
  transpilePackages: ["@repo/contracts", "@repo/core"],
};

export default nextConfig;
