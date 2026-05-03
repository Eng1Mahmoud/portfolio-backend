import { experienceService } from "../services/experienceService.js";
class ExperienceController {
    async createExperience(req, res) {
        return experienceService.createExperience(req, res);
    }
    async updateExperience(req, res) {
        return experienceService.updateExperience(req, res);
    }
    async deleteExperience(req, res) {
        return experienceService.deleteExperience(req, res);
    }
    async getExperienceById(req, res) {
        return experienceService.getExperienceById(req, res);
    }
    async getAllExperiences(req, res) {
        return experienceService.getAllExperiences(req, res);
    }
}
export const experienceController = new ExperienceController();
