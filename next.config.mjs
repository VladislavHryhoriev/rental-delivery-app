import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
});

/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    API_URL:
      process.env.NODE_ENV === "production"
        ? "https://rental-app-delivery.vercel.app/api"
        : "http://localhost:3000/api",
    MONGODB_URI:
      "mongodb+srv://delivery-app:AAHmZHsloU3FxLth@cluster0.fnp4bka.mongodb.net/rental-delivery",
  },
};

export default withPWA(nextConfig);
