import { Router } from "express";
import { recommendationsController } from "../controllers/recommendationsController.js";
const router = Router();
router.post("/", (req, res) => {
    recommendationsController.createRecommendation(req, res);
});
router.put("/:id", (req, res) => {
    recommendationsController.updateRecommendation(req, res);
});
router.delete("/:id", (req, res) => {
    recommendationsController.deleteRecommendation(req, res);
});
router.get("/:id", (req, res) => {
    recommendationsController.getRecommendationById(req, res);
});
router.get("/", (req, res) => {
    recommendationsController.getAllRecommendations(req, res);
});
export default router;
