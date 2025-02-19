import { Request, Response } from 'express';
import Project from '../models/Project.js'; // Add .js extension
class ProjectsController {
    // Get all projects
    async getProjects(req: Request, res: Response) {
        try {
            const projects = await Project.find();
            res.status(200).json(projects);
        } catch (error:any) {
            res.status(500).json({ message: error.message });
        }
    }


}

export default new ProjectsController();