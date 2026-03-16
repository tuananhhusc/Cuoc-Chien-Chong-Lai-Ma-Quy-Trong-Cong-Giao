import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/Cuoc-Chien-Chong-Lai-Ma-Quy-Trong-Cong-Giao',
  assetPrefix: '/Cuoc-Chien-Chong-Lai-Ma-Quy-Trong-Cong-Giao/',
};

export default nextConfig;
