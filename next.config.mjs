/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "danviet.mediacdn.vn",
      "aptech.fpt.edu.vn",
      "https://res.cloudinary.com",
      "res.cloudinary.com",
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
