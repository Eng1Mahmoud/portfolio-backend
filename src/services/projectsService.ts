import { Request, Response } from "express";
import Project from "../models/Project.js";

class ProjectsService {
    async createProject(req: Request, res: Response) {
        try {
            const project = new Project(req.body);
            await project.save();
            res.status(201).json({ message: "Project created successfully" });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateProject(req: Request, res: Response) {
        try {
            await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json({ message: "Project updated successfully" });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteProject(req: Request, res: Response) {
        try {
            await Project.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "Project deleted successfully" });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getProjectById(req: Request, res: Response) {
        try {
            const project = await Project.findById(req.params.id).select("-createdAt");
            res.status(200).json({
                project: project,
            });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAllProjects(req: Request, res: Response) {
        try {
            const projects = await Project.find()
                .select("-createdAt")
                .sort({ createdAt: -1 });

            res.status(200).json({
                message: "Projects retrieved successfully",
                projects: projects,
            });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}

export const projectsService = new ProjectsService();
