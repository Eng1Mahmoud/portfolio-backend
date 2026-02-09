import { Request, Response } from "express";
import Skill from "../models/Skill.js";

class SkillsService {
    async createSkill(req: Request, res: Response) {
        try {
            await Skill.create(req.body);
            res.status(201).json({
                message: "Skill created successfully",
            });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateSkill(req: Request, res: Response) {
        try {
            await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json({
                message: "Skill updated successfully",
            });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteSkill(req: Request, res: Response) {
        try {
            await Skill.findByIdAndDelete(req.params.id);
            res.status(200).json({
                message: "Skill deleted successfully",
            });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAllSkills(req: Request, res: Response) {
        try {
            const skills = await Skill.find().select("name imageUrl _id");
            res.status(200).json({
                skills: skills,
            });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getSkillById(req: Request, res: Response) {
        try {
            const skill = await Skill.findById(req.params.id).select("name imageUrl _id");
            res.status(200).json({
                skill: skill,
            });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}

export const skillsService = new SkillsService();
