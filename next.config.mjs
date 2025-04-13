/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "danviet.mediacdn.vn",
      },
      {
        protocol: "https",
        hostname: "aptech.fpt.edu.vn",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      // Google profile images
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      // Facebook profile images
      {
        protocol: "https",
        hostname: "platform-lookaside.fbsbx.com",
      },
      // GitHub profile images
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;
