import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {}, // ✅ must be an object
  },
  images: {
        domains: ['firebasestorage.googleapis.com'],

  }
  // ✅ Do not include 'matcher' here — it belongs in middleware config
};

export default nextConfig;
