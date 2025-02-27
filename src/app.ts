import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import ProfileRouter from "./routes/profileRoutes.js";
import SkillsRouter from "./routes/skillsRoutes.js";
import ProjectsRouter from "./routes/projectsRoutes.js";
import UploadRouter from "./routes/uploadRoutes.js";
import AuthRouter from "./routes/authRoutes.js";
dotenv.config();
// Create Express server
const app = express();
// Connect to MongoDB
await connectDB();
// Middleware
app.use(cors());
app.use(express.json());
// Routes
app.get("/", (req, res) => {
  res.send("Hello from TypeScript Express!");
});
console.log("test");
console.log(process.env.JWT_SECRET);
app.use("/api/auth", AuthRouter);
app.use("/api/profile", ProfileRouter);
app.use("/api/skills", SkillsRouter);
app.use("/api/projects", ProjectsRouter);
app.use("/api/upload", UploadRouter);

// Start the Express server
const port = process.env.PORT || 3000;
console.log(port);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
export default app;
