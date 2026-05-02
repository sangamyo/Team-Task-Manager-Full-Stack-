import mongoose from "mongoose";
import crypto from "crypto";

// Ensure crypto is available (fixes Railway/Docker deployment issues)
if (!globalThis.crypto) {
  globalThis.crypto = crypto;
}

export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is required");
  mongoose.set("strictQuery", true);
  
  try {
    await mongoose.connect(uri, {
      retryWrites: true,
      w: "majority",
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    throw error;
  }
}
