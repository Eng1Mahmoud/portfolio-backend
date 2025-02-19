import { Router } from "express";
import SkillsController from "../controllers/skillsController.js";

const router = Router();
// Define routes for skills
router.get("/", SkillsController.getSkills);
export default router;
