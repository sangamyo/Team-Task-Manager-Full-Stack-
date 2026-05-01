import "dotenv/config";
import { app } from "./app.js";
import { connectDB } from "./config/db.js";

const port = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`✅ API Server listening on port ${port}`);
      console.log(`📍 URL: ${process.env.NODE_ENV === "production" ? "https://your-api-url.vercel.app" : `http://localhost:${port}`}`);
    });
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  });
