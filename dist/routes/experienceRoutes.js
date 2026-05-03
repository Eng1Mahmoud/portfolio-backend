import { Router } from "express";
import { experienceController } from "../controllers/experienceController.js";
const router = Router();
router.post("/", (req, res) => {
    experienceController.createExperience(req, res);
});
router.put("/:id", (req, res) => {
    experienceController.updateExperience(req, res);
});
router.delete("/:id", (req, res) => {
    experienceController.deleteExperience(req, res);
});
router.get("/:id", (req, res) => {
    experienceController.getExperienceById(req, res);
});
router.get("/", (req, res) => {
    experienceController.getAllExperiences(req, res);
});
export default router;
