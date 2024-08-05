import mongoose from "mongoose";

export const connectDB = async () => {
  // if (isConnected) return;

  try {
    if (mongoose.connection.readyState >= 1) {
      console.log("Database is already connected");
      return;
    }

    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }

  mongoose.connection.on("connected", () => {
    console.log("Mongoose is connected");
  });

  mongoose.connection.on("error", (err) => {
    console.log(`Mongoose connection error: ${err}`);
  });
};

export const disconnectDB = () => mongoose.connection.close();
