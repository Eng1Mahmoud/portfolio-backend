import { Router } from 'express';
import profileController from '../controllers/profileController.js';
const router = Router();
// Use the imported controller instance directly
router.post('/', (req, res) => {
    profileController.createProfile(req, res);
});
export default router;
