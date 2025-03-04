import { Router } from "express";
import SkillsController from "../controllers/skillsController.js";
const router = Router();
// create a new skill
router.post("/", (req, res) => {
    SkillsController.createSkill(req, res);
});
// get all skills
router.get("/", (req, res) => {
    SkillsController.getSkills(req, res);
});
// update a skill
router.put("/:id", (req, res) => {
    SkillsController.updateSkill(req, res);
});
// delete a skill
router.delete("/:id", (req, res) => {
    SkillsController.deleteSkill(req, res);
});
export default router;
