import express from "express";
import dotenv from "dotenv";
import { corsMiddleware, chatLimiter, authLimiter } from "./config/security.js";
import connectDB from "./config/db.js";
import { protect } from "./middlewares/authMiddleware.js";
import ProfileRouter from "./routes/profileRoutes.js";
import SkillsRouter from "./routes/skillsRoutes.js";
import ProjectsRouter from "./routes/projectsRoutes.js";
import EducationRouter from "./routes/educationRoutes.js";
import ExperienceRouter from "./routes/experienceRoutes.js";
import RecommendationsRouter from "./routes/recommendationsRoutes.js";
import UploadRouter from "./routes/uploadRoutes.js";
import AuthRouter from "./routes/authRoutes.js";
import ChatRouter from "./routes/chatRoutes.js";
dotenv.config();
// Create Express server
const app = express();
// Connect to MongoDB
await connectDB();
// Needed so rate limiting keys on the real client IP rather than Vercel's proxy.
app.set("trust proxy", 1);
// Middleware
app.use(corsMiddleware);
// Rate limits for the two public, unauthenticated endpoints.
app.use("/api/chat", chatLimiter);
app.use("/api/auth/login", authLimiter);
// A chat message is a sentence, not a payload. Cap it before the 20mb parser
// below ever sees it, so an abuser cannot make us buffer megabytes per request.
app.use("/api/chat", express.json({ limit: "16kb" }));
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));
// Apply protect middleware to all write operations.
// Only login is public — registration is admin-only, otherwise anyone could
// create accounts in the database.
const PUBLIC_WRITE_PATHS = ["/api/auth/login", "/api/chat"];
const protectWriteOperations = async (req, res, next) => {
    const writeOperations = ['POST', 'PUT', 'PATCH', 'DELETE'];
    const isPublic = PUBLIC_WRITE_PATHS.some((path) => req.path.startsWith(path));
    if (writeOperations.includes(req.method) && !isPublic) {
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
app.use("/api/education", EducationRouter);
app.use("/api/experience", ExperienceRouter);
app.use("/api/recommendations", RecommendationsRouter);
app.use("/api/upload", UploadRouter);
app.use("/api/chat", ChatRouter);
// Start the Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
export default app;
