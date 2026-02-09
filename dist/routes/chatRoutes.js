import { Router } from "express";
import { chatController } from "../controllers/chatController.js";
const chatRouter = Router();
chatRouter.post("/", (async (req, res) => {
    await chatController.chat(req, res);
}));
export default chatRouter;
