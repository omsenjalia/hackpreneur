import type { NextConfig } from "next";

const previewOrigin = process.env.E2B_SANDBOX_ID
  ? `3000-${process.env.E2B_SANDBOX_ID}.e2b.app`
  : undefined;

const nextConfig: NextConfig = {
  devIndicators: false,
  allowedDevOrigins: previewOrigin ? [previewOrigin] : [],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
