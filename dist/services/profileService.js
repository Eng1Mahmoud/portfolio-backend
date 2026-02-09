import Profile from "../models/Profile.js";
class ProfileService {
    async createProfile(req, res) {
        try {
            const profile = new Profile(req.body);
            await profile.save();
            res.status(201).json(profile);
        }
        catch (error) {
            res.status(400).json({ message: error?.message });
        }
    }
    async updateProfile(req, res) {
        try {
            await Profile.findOneAndUpdate({}, req.body, {
                new: true,
                upsert: true,
            });
            res.status(200).json({
                message: "You are update profile successfully!",
            });
        }
        catch (error) {
            res.status(400).json({ message: error?.message });
        }
    }
    async getProfile(req, res) {
        try {
            const profile = await Profile.findOne();
            if (!profile) {
                return res.status(404).json({ message: "Profile not found" });
            }
            res.status(200).json({
                message: "You are get profile successfully!",
                info: profile,
            });
        }
        catch (error) {
            res.status(400).json({ message: error?.message });
        }
    }
}
export const profileService = new ProfileService();
