import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected || mongoose.connection.readyState >= 1) {
    return;
  }

  const rawURI =
    process.env.MONGODB_URI ||
    (process.env.DB_URL ? process.env.DB_URL + (process.env.DB_NAME || "") : "");

  const mongoURI = rawURI ? rawURI.trim() : "";

  if (!mongoURI) {
    const errorMsg = "MongoDB Connection Error: MONGODB_URI is not defined in Vercel Environment Variables.";
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  try {
    const db = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = db.connections[0].readyState === 1;
    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.error("MongoDB Connection Error:", err.message);
    throw new Error(`MongoDB Connection Failed: ${err.message}`);
  }
};

export default connectDB;
