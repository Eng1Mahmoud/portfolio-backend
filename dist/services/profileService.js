import Profile from "../models/Profile.js";
import axios from "axios";
import { extractText, getDocumentProxy } from "unpdf";
class ProfileService {
    async createProfile(req, res) {
        try {
            if (req.body.cv) {
                try {
                    req.body.cvContent = await this.getCVContent(req.body.cv);
                }
                catch (error) {
                    console.error("Error parsing CV for new profile:", error);
                    // Continue without cvContent if parsing fails, or you could throw
                }
            }
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
            if (req.body.cv) {
                try {
                    req.body.cvContent = await this.getCVContent(req.body.cv);
                }
                catch (error) {
                    console.error("Error parsing CV for update:", error);
                }
            }
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
    /**
     * Fetches a PDF from a URL and extracts its text content.
     */
    async getCVContent(url) {
        try {
            const response = await axios.get(url, { responseType: "arraybuffer" });
            const data = new Uint8Array(response.data);
            const pdf = await getDocumentProxy(data);
            const { text } = await extractText(pdf, { mergePages: true });
            return text;
        }
        catch (error) {
            throw new Error(`Failed to parse CV: ${error}`);
        }
    }
}
export const profileService = new ProfileService();
