import { Router } from 'express';
import ProjectsController from '../controllers/projectsController.js';
const router = Router();
// Define routes for projects
router.get('/', ProjectsController.getProjects);
export default router;
