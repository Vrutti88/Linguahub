import mongoose from "mongoose";

let isConnected = false;

// MongoDB Atlas Cloud Connection String
const ATLAS_URI =
  "mongodb+srv://vruttipatil1396_db_user:eV6DapylACpIqXWk@linguahub.tyknizj.mongodb.net/linguahub?retryWrites=true&w=majority";

const connectDB = async () => {
  if (isConnected || mongoose.connection.readyState >= 1) {
    return;
  }

  // Priority: 1) MONGODB_URI env var, 2) DB_URL env var (for local), 3) Cloud Atlas URI fallback
  const mongoURI =
    (process.env.MONGODB_URI && process.env.MONGODB_URI.trim()) ||
    (process.env.DB_URL ? (process.env.DB_URL + (process.env.DB_NAME || "")).trim() : null) ||
    ATLAS_URI;

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
