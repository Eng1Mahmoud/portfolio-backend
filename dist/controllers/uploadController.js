import { uploadService } from "../services/uploadService.js";
class UploadController {
    async uploadImage(req, res) {
        return uploadService.uploadImage(req, res);
    }
}
export const uploadController = new UploadController();
