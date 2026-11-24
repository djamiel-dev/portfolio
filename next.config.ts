import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Static export: `npm run build` writes plain files to out/ for Hostinger.
  output: "export",
  // Every page becomes folder/index.html, which Apache serves without rewrites.
  trailingSlash: true,
  // No image server on static hosting; the images are already sized webp.
  images: { unoptimized: true },
};

export default nextConfig;
