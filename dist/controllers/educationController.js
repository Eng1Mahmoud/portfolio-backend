import { educationService } from "../services/educationService.js";
class EducationController {
    async createEducation(req, res) {
        return educationService.createEducation(req, res);
    }
    async updateEducation(req, res) {
        return educationService.updateEducation(req, res);
    }
    async deleteEducation(req, res) {
        return educationService.deleteEducation(req, res);
    }
    async getEducationById(req, res) {
        return educationService.getEducationById(req, res);
    }
    async getAllEducations(req, res) {
        return educationService.getAllEducations(req, res);
    }
}
export const educationController = new EducationController();
