import "dotenv/config";
import { app } from "./app.js";
import { connectDB } from "./config/db.js";

const port = process.env.PORT || 4000;
const env = process.env.NODE_ENV || "development";

console.log(`\n🚀 Starting Quantum Teams API...`);
console.log(`📍 Environment: ${env}`);
console.log(`🔌 Port: ${port}\n`);

connectDB()
  .then(() => {
    const server = app.listen(port, () => {
      console.log(`\n✅ API Server Ready`);
      console.log(`🌐 http://localhost:${port}`);
      console.log(`📊 Health Check: http://localhost:${port}/health`);
      console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
    });

    // Graceful shutdown
    process.on("SIGTERM", () => {
      console.log("\n⚠️  SIGTERM received, shutting down gracefully...");
      server.close(() => {
        console.log("✅ Server closed");
        process.exit(0);
      });
    });
  })
  .catch((error) => {
    console.error("\n❌ FATAL: Failed to start server");
    console.error(error);
    process.exit(1);
  });
