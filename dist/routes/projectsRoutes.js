import { Router } from "express";
import { projectsController } from "../controllers/projectsController.js";
const router = Router();
// create new project
router.post("/", (req, res) => {
    projectsController.createProject(req, res);
});
// update project
router.put("/:id", (req, res) => {
    projectsController.updateProject(req, res);
});
// delete project
router.delete("/:id", (req, res) => {
    projectsController.deleteProject(req, res);
});
// get project by id
router.get("/:id", (req, res) => {
    projectsController.getProjectById(req, res);
});
// get all projects
router.get("/", (req, res) => {
    projectsController.getProjects(req, res);
});
export default router;
