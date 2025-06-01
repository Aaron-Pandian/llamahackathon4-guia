/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add experimental flag to ignore Node.js version check
  experimental: {
    skipTrailingSlashRedirect: true,
    serverComponentsExternalPackages: [],
  },
  // Add transpilePackages to ensure compatibility
  transpilePackages: [],
};

export default nextConfig;
