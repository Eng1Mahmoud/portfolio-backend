import { projectsService } from "../services/projectsService.js";
class ProjectsController {
    // create a new project
    async createProject(req, res) {
        return projectsService.createProject(req, res);
    }
    // update a project
    async updateProject(req, res) {
        return projectsService.updateProject(req, res);
    }
    // delete a project
    async deleteProject(req, res) {
        return projectsService.deleteProject(req, res);
    }
    // get a project by id
    async getProjectById(req, res) {
        return projectsService.getProjectById(req, res);
    }
    // Get all projects
    async getProjects(req, res) {
        return projectsService.getAllProjects(req, res);
    }
}
export const projectsController = new ProjectsController();
