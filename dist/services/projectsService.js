import Project from "../models/Project.js";
class ProjectsService {
    async createProject(req, res) {
        try {
            const project = new Project(req.body);
            await project.save();
            res.status(201).json({ message: "Project created successfully" });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async updateProject(req, res) {
        try {
            await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json({ message: "Project updated successfully" });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async deleteProject(req, res) {
        try {
            await Project.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "Project deleted successfully" });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async getProjectById(req, res) {
        try {
            const project = await Project.findById(req.params.id).select("-createdAt");
            res.status(200).json({
                project: project,
            });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async getAllProjects(req, res) {
        try {
            const projects = await Project.find()
                .select("-createdAt")
                .sort({ createdAt: -1 });
            res.status(200).json({
                message: "Projects retrieved successfully",
                projects: projects,
            });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
export const projectsService = new ProjectsService();
