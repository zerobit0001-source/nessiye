import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },

  allowedDevOrigins: ["10.125.148.10"],
};

export default nextConfig;