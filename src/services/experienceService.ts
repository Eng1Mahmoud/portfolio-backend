import { Request, Response } from "express";
import Experience from "../models/Experience.js";

class ExperienceService {
    async createExperience(req: Request, res: Response) {
        try {
            const experience = new Experience(req.body);
            await experience.save();
            res.status(201).json({ message: "Experience created successfully" });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateExperience(req: Request, res: Response) {
        try {
            await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json({ message: "Experience updated successfully" });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteExperience(req: Request, res: Response) {
        try {
            await Experience.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "Experience deleted successfully" });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getExperienceById(req: Request, res: Response) {
        try {
            const experience = await Experience.findById(req.params.id).select("-createdAt");
            res.status(200).json({
                experience: experience,
            });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAllExperiences(req: Request, res: Response) {
        try {
            const experiences = await Experience.find()
                .select("-createdAt")
                .sort({ createdAt: -1 });

            res.status(200).json({
                message: "Experiences retrieved successfully",
                experiences: experiences,
            });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}

export const experienceService = new ExperienceService();
