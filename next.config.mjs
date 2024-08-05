/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    API_URL: "http://localhost:3000/api",
    MONGODB_URI:
      "mongodb+srv://delivery-app:AAHmZHsloU3FxLth@cluster0.fnp4bka.mongodb.net/rental-delivery",
  },
};

export default nextConfig;
