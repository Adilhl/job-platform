import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

// Routes
import jobRoutes from "./routes/job.routes";
import adminRoutes from "./routes/admin.routes";
// Load environment variables
dotenv.config();

const app = express();

// Middlewares
app.use(cors({
  origin: "http://localhost:3000", // change to your frontend URL
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files (resumes)
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Health check endpoint
app.get("/health", (_req, res) => {
  res.json({ status: "OK! its working" });
});

// Routes
//app.use("/api/admin", adminRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/admin", adminRoutes);

// Global error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: err.message || "Internal Server Error",
  });
});

export default app;
