/** @type {import('next').NextConfig} */
module.exports = {
  distDir: "./.next",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/v0/b/mixellence-bdf68.appspot.com/o/**",
      },
    ],
    unoptimized: true,
  },
};
