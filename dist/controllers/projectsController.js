import Project from '../models/Project.js'; // Add .js extension
class ProjectsController {
    // Get all projects
    async getProjects(req, res) {
        try {
            const projects = await Project.find();
            res.status(200).json(projects);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
export default new ProjectsController();
