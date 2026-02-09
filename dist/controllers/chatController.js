import chatService from '../services/chatService.js';
class ChatController {
    async chat(req, res) {
        try {
            const { message } = req.body;
            if (!message) {
                return res.status(400).json({ message: 'Message is required' });
            }
            const responseText = await chatService.getChatResponse(message);
            res.status(200).json({
                message: responseText,
            });
        }
        catch (error) {
            console.error('Chat Error:', error);
            res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    }
}
export default new ChatController();
