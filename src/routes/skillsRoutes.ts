import { Request, Response, Router } from "express";
import SkillsController from "../controllers/skillsController.js";

const router = Router();
// Define routes for skills
router.get("/", (req:Request, res:Response) => {
    SkillsController.getSkills(req, res);
});
export default router;
