import cloudinary from "../config/cloudinary.js";
// src/controllers/uploadController.ts
import express from "express";

class UploadController {
  async uploadImage(req: express.Request, res: express.Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Upload to Cloudinary
      const result = await new Promise((resolve, reject) => {
        const options: any = {
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
            } else {
              resolve(result);
            }
          })
          .end(req.file!.buffer);
      });

      res.status(201).json({
        url: (result as any).secure_url
      });
    } catch (error) {
      console.error("Full error:", error);
      res.status(500).json({ message: "Server error", error: String(error) });
    }
  }
}

export default new UploadController();
