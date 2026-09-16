import type { NextConfig } from "next";
const config: NextConfig = {
  reactStrictMode: true,
  outputFileTracingIncludes: { "/*": ["./content/**/*"] },
};
export default config;
