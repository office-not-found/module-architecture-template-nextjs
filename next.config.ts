import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    silenceDeprecations: ["legacy-js-api"]
  },
  reactStrictMode: true
};

export default nextConfig;


