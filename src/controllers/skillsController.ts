import { Request, Response } from 'express';
import Skill from '../models/Skill.js';

class SkillsController {

    // Get all skills
    async getSkills(req: Request, res: Response) {
        try {
            const skills = await Skill.find();
            res.status(200).json(skills);
        } catch (error:any) {
            res.status(500).json({ message: error.message });
        }
    }

}

export default new SkillsController();