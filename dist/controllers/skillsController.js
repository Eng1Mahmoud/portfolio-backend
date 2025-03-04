import Skill from '../models/Skill.js';
class SkillsController {
    // creat a new skill
    async createSkill(req, res) {
        try {
            const skill = await Skill.create(req.body);
            res.status(201).json({
                message: 'Skill created successfully',
            });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    // update a skill
    async updateSkill(req, res) {
        try {
            // req.params.id gets the ID from the URL (e.g., /skills/1)
            // req.body contains the updated skill data
            const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json({
                message: 'Skill updated successfully',
            });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    // delete a skill
    async deleteSkill(req, res) {
        try {
            await Skill.findByIdAndDelete(req.params.id);
            res.status(200).json({
                message: 'Skill deleted successfully',
            });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    // Get all skills
    async getSkills(req, res) {
        try {
            const skills = await Skill.find().select('name imageUrl _id');
            res.status(200).json({
                message: 'Skills retrieved successfully',
                skills: skills,
            });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
export default new SkillsController();
