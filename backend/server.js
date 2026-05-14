import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import universityRoutes from "./routes/universityRoutes.js";
import scholarshipRoutes from "./routes/scholarshipRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import counsellingRoutes from "./routes/counsellingRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import articleRoutes from "./routes/articleRoutes.js";
import destinationRoutes from "./routes/destinationRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:4173",
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    if (!origin) {
      return callback(null, true);
    }

    const isAllowed =
      allowedOrigins.includes(origin) ||
      /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin);

    if (isAllowed) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/universities", universityRoutes);
app.use("/api/scholarships", scholarshipRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/counselling", counsellingRoutes);
app.use("/api/users", userRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/destinations", destinationRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
