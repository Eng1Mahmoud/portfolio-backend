import Profile from "../models/Profile.js"; // Add .js extension
class ProfileController {
    async createProfile(req, res) {
        try {
            const profile = new Profile(req.body);
            console.log(profile);
            await profile.save();
            res.status(201).json(profile);
        }
        catch (error) {
            res.status(400).json({ message: error?.message });
        }
    }
}
const profileController = new ProfileController();
export default profileController;
