import { recommendationsService } from "../services/recommendationsService.js";
class RecommendationsController {
    async createRecommendation(req, res) {
        return recommendationsService.createRecommendation(req, res);
    }
    async updateRecommendation(req, res) {
        return recommendationsService.updateRecommendation(req, res);
    }
    async deleteRecommendation(req, res) {
        return recommendationsService.deleteRecommendation(req, res);
    }
    async getRecommendationById(req, res) {
        return recommendationsService.getRecommendationById(req, res);
    }
    async getAllRecommendations(req, res) {
        return recommendationsService.getAllRecommendations(req, res);
    }
}
export const recommendationsController = new RecommendationsController();
