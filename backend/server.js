import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import universityRoutes from "./routes/universityRoutes.js";
import scholarshipRoutes from "./routes/scholarshipRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import counsellingRoutes from "./routes/counsellingRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import articleRoutes from "./routes/articleRoutes.js";
import destinationRoutes from "./routes/destinationRoutes.js";

dotenv.config();

connectDB();
const PORT = process.env.PORT || 5000;
const app = express();


app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/universities", universityRoutes);
app.use("/api/scholarships", scholarshipRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/counselling", counsellingRoutes);
app.use("/api/users", userRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/destinations", destinationRoutes);




app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
