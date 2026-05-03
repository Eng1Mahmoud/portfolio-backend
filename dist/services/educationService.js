import Education from "../models/Education.js";
class EducationService {
    async createEducation(req, res) {
        try {
            const education = new Education(req.body);
            await education.save();
            res.status(201).json({ message: "Education created successfully" });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async updateEducation(req, res) {
        try {
            await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json({ message: "Education updated successfully" });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async deleteEducation(req, res) {
        try {
            await Education.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "Education deleted successfully" });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async getEducationById(req, res) {
        try {
            const education = await Education.findById(req.params.id).select("-createdAt");
            res.status(200).json({
                education: education,
            });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async getAllEducations(req, res) {
        try {
            const educations = await Education.find()
                .select("-createdAt")
                .sort({ createdAt: -1 });
            res.status(200).json({
                message: "Educations retrieved successfully",
                educations: educations,
            });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
export const educationService = new EducationService();
