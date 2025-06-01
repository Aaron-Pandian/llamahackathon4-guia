/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add experimental flag to ignore Node.js version check
  experimental: {
    skipTrailingSlashRedirect: true,
    serverComponentsExternalPackages: [],
  },
  // Add transpilePackages to ensure compatibility
  transpilePackages: [],

  webpack: (config) => {
    config.externals.push({
      fs: "commonjs fs",
      path: "commonjs path",
    });
    return config;
  },
};

export default nextConfig;
