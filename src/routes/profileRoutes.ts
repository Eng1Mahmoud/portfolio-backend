import { Request, Response, Router } from 'express';
import profileController from '../controllers/profileController.js'; 

const router = Router();

// Use the imported controller instance directly
router.post('/', (req:Request, res:Response) => {
    profileController.createProfile(req, res);
});

export default router;
