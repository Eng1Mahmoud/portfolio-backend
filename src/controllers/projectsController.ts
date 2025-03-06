import { Request, Response } from "express";
import Project from "../models/Project.js"; // Add .js extension
class ProjectsController {
  // create a new project
  async createProject(req: Request, res: Response) {
    try {
      const project = new Project(req.body);
      await project.save();
      res.status(201).json({ message: "Project created successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
  // update a project
  async updateProject(req: Request, res: Response) {
    try {
      await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json({ message: "Project updated successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
  // delete a project
  async deleteProject(req: Request, res: Response) {
    try {
      await Project.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Project deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
  // get a project by id
  async getProjectById(req: Request, res: Response) {
    try {
      const project = await Project.findById(req.params.id).select(
        "-createdAt"
      );
      res.status(200).json({
        project: project,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
  // Get all projects
  async getProjects(req: Request, res: Response) {
    try {
      const projects = await Project.find()
        .select("-createdAt")
        .sort({ createdAt: -1 }); // Sort by createdAt in descending order (newest first)

      res.status(200).json({
        message: "Projects retrieved successfully",
        projects: projects,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new ProjectsController();
