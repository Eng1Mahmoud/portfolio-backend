import cloudinary from "../config/cloudinary.js";
import express from "express";
import axios from "axios";

class UploadController {
  async uploadImage(req: express.Request, res: express.Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Convert buffer to base64
      const base64Image = req.file.buffer.toString('base64');
      
      // Upload to Pronto.io
      const response = await axios.post(
        'https://api.getpronto.io/v1/upload',
        {
          image: base64Image,
          name: req.file.originalname || 'uploaded-image'
        },
        {
          headers: {
              "ApiKey": `${process.env.PRONTO_API_KEY}`,
              "Content-Type": "application/json",
              "Accept": "application/json"
            
          }
        }
      );
      console.log("Pronto.io response:", response.data);
      res.status(201).json({
        url: response.data.file.url
      });
    } catch (error) {
      console.error("Full error:", error);
      res.status(500).json({ message: "Server error", error: String(error) });
    }
  }
}

export default new UploadController();
