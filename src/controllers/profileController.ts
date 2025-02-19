import Profile from "../models/Profile.js"; // Add .js extension
import { Request, Response } from 'express';

class ProfileController {
    async createProfile(req: Request, res: Response) {
        try {
            const profile = new Profile(req.body);
            await profile.save();
            res.status(201).json(profile);
        } catch (error: any) {
            res.status(400).json({ message: error?.message });
        }
    }
}

const profileController = new ProfileController();
export default profileController;