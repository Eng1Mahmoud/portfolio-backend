// src/routes/uploadRoutes.ts
import { Request, Response, Router } from "express";
import UploadController from "../controllers/uploadController.js";
import upload from "../middlewares/uploadImages.js";
const router = Router();
// Define routes for upload following the skills route pattern
/* router.post('/', (req:Request, res:Response) => {
    UploadController.uploadImage(req, res);
}); */
router.post(
  "/",
  upload.single("image"),
  async (req: Request, res: Response) => {
    UploadController.uploadImage(req, res);
  }
);

export default router;
