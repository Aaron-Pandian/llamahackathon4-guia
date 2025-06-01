/** @type {import('next').NextConfig} */
const nextConfig = {
  skipTrailingSlashRedirect: true,
  serverExternalPackages: [],
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
