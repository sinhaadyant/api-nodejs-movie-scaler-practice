import cors from "cors";
import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import authRoutes from "./routes/authRoutes";
import blogRoutes from "./routes/blogRoutes";
import { errorHandler } from "./middleware/errorHandler";
import mongoose from "mongoose";
import config from "./config";
import logger from "./utils/logger";

const app = express();

// Common Middlewares
app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/blog", blogRoutes);

// Error handling middleware
app.use(errorHandler);

// Connect to MongoDB
if (!config.mongoUri) {
  throw new Error("MongoDB URI is not defined in the configuration.");
}

mongoose
  .connect(config.mongoUri as string) // Simply pass the URI string
  .then(() => logger.info("MongoDB connected"))
  .catch((err) => logger.error("MongoDB connection error:", err));

export default app;
