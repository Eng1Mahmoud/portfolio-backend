import { Router } from 'express';
import ProjectsController from '../controllers/projectsController.js';
const router = Router();
// Define routes for projects
router.get('/', (req, res) => {
    ProjectsController.getProjects(req, res);
});
export default router;
