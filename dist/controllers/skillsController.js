import Skill from '../models/Skill.js';
class SkillsController {
    // Get all skills
    async getSkills(req, res) {
        try {
            const skills = await Skill.find();
            res.status(200).json(skills);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
export default new SkillsController();
