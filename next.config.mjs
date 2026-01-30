/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.ignoreWarnings = [
      {
        module: /sequelize/,
      },
    ];
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "vacdqvgnnkcmoxgcfxkz.supabase.co",
      },
    ],
  },
};

export default nextConfig;
