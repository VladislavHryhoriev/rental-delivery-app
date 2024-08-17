import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
});

/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
};

export default withPWA(nextConfig);
