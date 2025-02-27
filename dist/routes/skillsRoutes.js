import { Router } from "express";
import SkillsController from "../controllers/skillsController.js";
const router = Router();
// Define routes for skills
router.get("/", (req, res) => {
    SkillsController.getSkills(req, res);
});
export default router;
