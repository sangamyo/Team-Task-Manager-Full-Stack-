import mongoose from "mongoose";

export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    console.error("❌ FATAL ERROR: MONGODB_URI environment variable is not set");
    console.error("Required in .env: MONGODB_URI=mongodb+srv://...");
    process.exit(1);
  }

  try {
    // Mask password in logs
    const maskedUri = uri.replace(/:[^:]+@/, ':***@');
    console.log(`🔄 Connecting to MongoDB: ${maskedUri}`);

    mongoose.set("strictQuery", true);
    
    await mongoose.connect(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    console.log("✅ MongoDB Connected Successfully");
    console.log(`📊 Database: ${mongoose.connection.db?.databaseName}`);
    return true;
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:");
    console.error(`   Error: ${error.message}`);
    console.error(`   Code: ${error.code}`);
    
    if (error.message.includes("ENOTFOUND")) {
      console.error("   → Check: Cluster domain is correct in MONGODB_URI");
      console.error("   → Check: Network whitelist includes 0.0.0.0/0");
    }
    
    if (error.message.includes("authentication failed")) {
      console.error("   → Check: Username and password are correct");
    }
    
    process.exit(1);
  }
}
