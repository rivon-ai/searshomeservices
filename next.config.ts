import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.searshomeservices.com",
      },
      {
        protocol: "https",
        hostname: "cdn.cookielaw.org",
      },
    ],
  },
};

export default nextConfig;
