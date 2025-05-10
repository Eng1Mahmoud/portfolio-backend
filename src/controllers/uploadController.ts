// src/controllers/uploadController.ts
import express from "express";
import { uploadToSirv } from "../config/sirv.js";
import { Console } from "console";

class UploadController {
  async uploadImage(req: express.Request, res: express.Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Upload to Sirv
      const filename = req.file!.originalname || 'upload.jpg';
      const imageUrl = await uploadToSirv(req.file!.buffer, filename);
      console.log("Image URL:", imageUrl);
      res.status(201).json({
        url: imageUrl
      });
    } catch (error) {
      console.error("Full error:", error);
      res.status(500).json({ message: "Server error", error: String(error) });
    }
  }
}

export default new UploadController();
