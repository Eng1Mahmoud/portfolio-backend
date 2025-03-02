import Profile from "../models/Profile.js"; // Add .js extension
import { Request, Response } from 'express';

class ProfileController {
    // create profile
    async createProfile(req: Request, res: Response) {
        try {
            const profile = new Profile(req.body);
            await profile.save();
            res.status(201).json(profile);
        } catch (error: any) {
            res.status(400).json({ message: error?.message });
        }
    }

    // update profile - update first profile
    async updateProfile(req: Request, res: Response) {
        try {
            await Profile.findOneAndUpdate({}, req.body, { 
                new: true,
                upsert: true // Create if doesn't exist
            });
            res.status(200).json({
                message:"You are update profile successfully!",
            });
        } catch (error: any) {
            res.status(400).json({ message: error?.message });
        }
    }

    // get profile - get first profile
    async getProfile(req: Request, res: Response) {
        try {
            const profile = await Profile.findOne();
            if (!profile) {
                return res.status(404).json({ message: 'Profile not found' });
            }
            res.status(200).json({
                message:"You are get profile successfully!",
                info:profile
            });
        } catch (error: any) {
            res.status(400).json({ message: error?.message });
        }
    }
}

const profileController = new ProfileController();
export default profileController;