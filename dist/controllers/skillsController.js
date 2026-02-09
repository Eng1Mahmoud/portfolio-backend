import { skillsService } from '../services/skillsService.js';
class SkillsController {
    // creat a new skill
    async createSkill(req, res) {
        return skillsService.createSkill(req, res);
    }
    // update a skill
    async updateSkill(req, res) {
        return skillsService.updateSkill(req, res);
    }
    // delete a skill
    async deleteSkill(req, res) {
        return skillsService.deleteSkill(req, res);
    }
    // Get all skills
    async getSkills(req, res) {
        return skillsService.getAllSkills(req, res);
    }
    // get a skill by id
    async getSkillById(req, res) {
        return skillsService.getSkillById(req, res);
    }
}
export const skillsController = new SkillsController();
