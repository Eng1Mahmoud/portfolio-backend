import { Router } from "express";
import { educationController } from "../controllers/educationController.js";
const router = Router();
router.post("/", (req, res) => {
    educationController.createEducation(req, res);
});
router.put("/:id", (req, res) => {
    educationController.updateEducation(req, res);
});
router.delete("/:id", (req, res) => {
    educationController.deleteEducation(req, res);
});
router.get("/:id", (req, res) => {
    educationController.getEducationById(req, res);
});
router.get("/", (req, res) => {
    educationController.getAllEducations(req, res);
});
export default router;
