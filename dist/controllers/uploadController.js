import cloudinary from "../config/cloudinary.js";
class UploadController {
    async uploadImage(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({ message: "No file uploaded" });
            }
            // Upload to Cloudinary
            const result = await new Promise((resolve, reject) => {
                const options = {
                    resource_type: "auto",
                    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                    api_key: process.env.CLOUDINARY_API_KEY,
                    api_secret: process.env.CLOUDINARY_API_SECRET,
                    folder: 'portfolio'
                };
                cloudinary.uploader
                    .upload_stream(options, (error, result) => {
                    if (error) {
                        console.error("Cloudinary upload error:", error);
                        reject(error);
                    }
                    else {
                        resolve(result);
                    }
                })
                    .end(req.file.buffer);
            });
            res.json({
                url: result.secure_url,
                publicId: result.public_id,
            });
        }
        catch (error) {
            console.error("Full error:", error);
            res.status(500).json({ message: "Server error", error: String(error) });
        }
    }
}
export default new UploadController();
