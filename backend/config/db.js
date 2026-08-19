import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected || mongoose.connection.readyState >= 1) {
    return;
  }

  const mongoURI =
    process.env.MONGODB_URI ||
    (process.env.DB_URL ? process.env.DB_URL + (process.env.DB_NAME || "") : "");

  if (!mongoURI) {
    console.error("MongoDB Connection Error: Neither MONGODB_URI nor DB_URL is defined.");
    return;
  }

  try {
    const db = await mongoose.connect(mongoURI);
    isConnected = db.connections[0].readyState === 1;
    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.error("MongoDB Connection Error:", err.message);
    if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
      process.exit(1);
    }
  }
};

export default connectDB;
