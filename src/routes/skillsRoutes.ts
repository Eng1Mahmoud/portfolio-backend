import { Request, Response, Router } from "express";
import SkillsController from "../controllers/skillsController.js";

const router = Router();

// create a new skill
router.post("/", (req: Request, res: Response) => {
  SkillsController.createSkill(req, res);
});
// get all skills
router.get("/", (req: Request, res: Response) => {
  SkillsController.getSkills(req, res);
});

// update a skill
router.put("/:id", (req: Request, res: Response) => {
  SkillsController.updateSkill(req, res);
});
// delete a skill
router.delete("/:id", (req: Request, res: Response) => {
  SkillsController.deleteSkill(req, res);
});

export default router;
