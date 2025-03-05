import { Request, Response } from 'express';
import Skill from '../models/Skill.js';

class SkillsController {
    // creat a new skill
    async createSkill(req: Request, res: Response) {
        try {
            const skill = await Skill.create(req.body);
            res.status(201).json({
                message: 'Skill created successfully',
            });
        } catch (error:any) {
            res.status(500).json({ message: error.message });
        }
    }
    // update a skill
    async updateSkill(req: Request, res: Response) {
        try {
            // req.params.id gets the ID from the URL (e.g., /skills/1)
            // req.body contains the updated skill data
            await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json({
                message: 'Skill updated successfully',
            });
        } catch (error:any) {
            res.status(500).json({ message: error.message });
        }
    }
    // delete a skill
    async deleteSkill(req: Request, res: Response) {
        try {
            await Skill.findByIdAndDelete(req.params.id);
            res.status(200).json({
                message: 'Skill deleted successfully',
            });
        } catch (error:any) {
            res.status(500).json({ message: error.message });
        }
    }
    // Get all skills
    async getSkills(req: Request, res: Response) {
        try {
            const skills = await Skill.find().select('name imageUrl _id');
            res.status(200).json({
                skills:skills,
            });
        } catch (error:any) {
            res.status(500).json({ message: error.message });
        }
    }
    // get a skill by id
    async getSkillById(req: Request, res: Response) {
        try {
            const skill = await Skill.findById(req.params.id).select('name imageUrl _id');
            res.status(200).json({
                skill:skill,
            });
        } catch (error:any) {
            res.status(500).json({ message: error.message });
        }
    }

}

export default new SkillsController();