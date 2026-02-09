import { Router } from 'express';
import { skillsController } from '../controllers/skillsController.js';
const router = Router();
// create a new skill
router.post("/", (req, res) => {
    skillsController.createSkill(req, res);
});
// get all skills
router.get("/", (req, res) => {
    skillsController.getSkills(req, res);
});
// update a skill
router.put("/:id", (req, res) => {
    skillsController.updateSkill(req, res);
});
// delete a skill
router.delete("/:id", (req, res) => {
    skillsController.deleteSkill(req, res);
});
// get a skill by id
router.get("/:id", (req, res) => {
    skillsController.getSkillById(req, res);
});
export default router;
