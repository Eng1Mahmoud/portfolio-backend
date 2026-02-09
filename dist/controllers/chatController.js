import { chatService } from '../services/chatService.js';
class ChatController {
    async chat(req, res) {
        return chatService.getChatResponse(req, res);
    }
}
export const chatController = new ChatController();
