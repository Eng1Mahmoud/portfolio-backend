import { Router } from "express";
import ProjectsController from "../controllers/projectsController.js";
const router = Router();
// create new project
router.post("/", (req, res) => {
    ProjectsController.createProject(req, res);
});
// update project
router.put("/:id", (req, res) => {
    ProjectsController.updateProject(req, res);
});
// delete project
router.delete("/:id", (req, res) => {
    ProjectsController.deleteProject(req, res);
});
// get project by id
router.get("/:id", (req, res) => {
    ProjectsController.getProjectById(req, res);
});
// get all projects
router.get("/", (req, res) => {
    ProjectsController.getProjects(req, res);
});
export default router;
