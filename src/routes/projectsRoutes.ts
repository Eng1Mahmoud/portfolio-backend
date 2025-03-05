import { Request, Response, Router } from "express";
import ProjectsController from "../controllers/projectsController.js";

const router = Router();
// create new project
router.post("/", (req: Request, res: Response) => {
  ProjectsController.createProject(req, res);
});
// update project
router.put("/:id", (req: Request, res: Response) => {
  ProjectsController.updateProject(req, res);
});
// delete project
router.delete("/:id", (req: Request, res: Response) => {
  ProjectsController.deleteProject(req, res);
});
// get project by id
router.get("/:id", (req: Request, res: Response) => {
  ProjectsController.getProjectById(req, res);
});
// get all projects
router.get("/", (req: Request, res: Response) => {
  ProjectsController.getProjects(req, res);
});

export default router;
