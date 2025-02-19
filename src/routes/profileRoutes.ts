import { Router } from 'express';
import profileController from '../controllers/profileController.js'; 

const router = Router();

// Use the imported controller instance directly
router.post('/', profileController.createProfile);

export default router;