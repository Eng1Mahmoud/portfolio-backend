import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import { protect } from "./middlewares/authMiddleware.js";
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
// Apply protect middleware to all write operations
const protectWriteOperations = async (req, res, next) => {
    const writeOperations = ['POST', 'PUT', 'PATCH', 'DELETE'];
    if (writeOperations.includes(req.method) && !req.path.includes('/api/auth')) {
        try {
            await protect(req, res, next);
        }
        catch (error) {
            return res.status(401).json({ message: "Authentication failed" });
        }
    }
    else {
        next();
    }
};
// Use the middleware
app.use(protectWriteOperations);
// Routes
app.get("/", (req, res) => {
    res.send("Hello from TypeScript Express!");
});
app.use("/api/auth", AuthRouter);
app.use("/api/profile", ProfileRouter);
app.use("/api/skills", SkillsRouter);
app.use("/api/projects", ProjectsRouter);
app.use("/api/upload", UploadRouter);
// Start the Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
export default app;
