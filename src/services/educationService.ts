import { Request, Response } from "express";
import Education from "../models/Education.js";

class EducationService {
    async createEducation(req: Request, res: Response) {
        try {
            const education = new Education(req.body);
            await education.save();
            res.status(201).json({ message: "Education created successfully" });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateEducation(req: Request, res: Response) {
        try {
            await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json({ message: "Education updated successfully" });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteEducation(req: Request, res: Response) {
        try {
            await Education.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "Education deleted successfully" });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getEducationById(req: Request, res: Response) {
        try {
            const education = await Education.findById(req.params.id).select("-createdAt");
            res.status(200).json({
                education: education,
            });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAllEducations(req: Request, res: Response) {
        try {
            const educations = await Education.find()
                .select("-createdAt")
                .sort({ createdAt: -1 });

            res.status(200).json({
                message: "Educations retrieved successfully",
                educations: educations,
            });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}

export const educationService = new EducationService();
