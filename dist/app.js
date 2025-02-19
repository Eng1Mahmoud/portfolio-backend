import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import ProfileRouter from "./routes/profileRoutes.js";
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
app.use("/api/profile", ProfileRouter);
/* app.use("/api/skills", SkillsRouter);
app.use("/api/projects", ProjectsRouter); */
// Start the Express server
const port = process.env.PORT || 3000;
app.listen(3000, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
export default app;
