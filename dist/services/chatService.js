import { GoogleGenAI } from "@google/genai";
import Profile from "../models/Profile.js";
import Skill from "../models/Skill.js";
import Project from "../models/Project.js";
class ChatService {
    cachedSystemPrompt = null;
    lastCacheUpdate = 0;
    CACHE_TTL = 1000 * 60 * 60; // 1 hour
    MODELS = [
        "gemini-3-flash-preview",
        "gemini-3-pro-preview",
        "gemini-2.5-flash",
        "gemini-2.5-pro",
        "gemini-2.0-flash",
        "gemini-1.5-flash"
    ];
    async getChatResponse(req, res) {
        try {
            const { message } = req.body;
            if (!message) {
                return res.status(400).json({ message: "Message is required" });
            }
            // Step 1: Retrieve the (cached) system prompt
            const systemPrompt = await this.getSystemPrompt();
            // Step 2: Initialize the Gemini AI client
            const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
            // Step 3: Attempt generation with model failover
            let lastError = null;
            for (const modelName of this.MODELS) {
                try {
                    const result = await client.models.generateContent({
                        model: modelName,
                        contents: message,
                        config: {
                            systemInstruction: systemPrompt,
                        },
                    });
                    // If successful, return the response immediately
                    return res.status(200).json({
                        message: result.text,
                    });
                }
                catch (error) {
                    lastError = error;
                    // If it's a quota error (429), log it and try the next model
                    if (error.status === 429) {
                        continue;
                    }
                    // For other errors (like 404), break and handle below
                    break;
                }
            }
            // Step 4: If we reach here, all attempts failed
            const status = lastError?.status || 500;
            let userFriendlyMessage = "Internal Server Error";
            if (status === 429) {
                userFriendlyMessage = "AI Quota exceeded for all available models. Please try again later.";
            }
            else if (status === 404) {
                userFriendlyMessage = "The AI model configuration is invalid or the service is temporarily unavailable.";
            }
            console.error("Chat Failover Error:", lastError);
            res.status(status).json({ message: userFriendlyMessage, error: lastError?.message });
        }
        catch (error) {
            console.error("Critical Chat Error:", error);
            res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    }
    async getSystemPrompt() {
        const now = Date.now();
        // Check if we can use the cached version
        if (this.cachedSystemPrompt && now - this.lastCacheUpdate < this.CACHE_TTL) {
            return this.cachedSystemPrompt;
        }
        // 1. Fetch live data from MongoDB
        const [profile, skills, projects] = await Promise.all([
            Profile.findOne(),
            Skill.find().select("name yearsOfExperience"),
            Project.find().select("title description demoLink githubLink"),
        ]);
        if (!profile) {
            throw new Error("Profile data not found to provide context for the AI.");
        }
        // 2. Format the data into a readable prompt for the AI
        this.cachedSystemPrompt = this.constructSystemPrompt(profile, skills, projects);
        this.lastCacheUpdate = now;
        return this.cachedSystemPrompt;
    }
    constructSystemPrompt(profile, skills, projects) {
        const skillsList = skills
            .map(s => `- ${s.name}${s.yearsOfExperience ? ` (${s.yearsOfExperience} years)` : ""}`)
            .join("\n");
        const projectsList = projects
            .map(p => `- ${p.title}: ${p.description}`)
            .join("\n");
        return `
You are a highly professional and helpful AI assistant representing Mahmoud Mohamed. Your tone should be polished, knowledgeable, and inviting.

Your mission:
1. Provide detailed and well-structured answers about Mahmoud's background, skills, and projects using ONLY the provided context.
2. **Prioritize Strong Projects**: When asked about projects, always mention and detail these first: **World Chat App**, **Direct Rent**, **El-Baraka Market**, **Watch Store**, and **Bus Booking**. These represent his advanced full-stack and professional experience.
3. Use Markdown for formatting:
   - Use bold titles for clarity.
   - Use ordered (numbered) lists (e.g., 1. , 2. , etc.) when explaining steps or listing multiple items to ensure clarity.
   - Use bullet points (- or *) for listing features, skills, or projects.
   - ALWAYS use lists when providing multiple pieces of information to keep the layout organized.
4. Use emojis in a balanced way (typically 2-4 per response). They should make the response feel inviting but should not be excessive or used in every single sentence.
5. Keep vertical spacing compact: Avoid using triple newlines or excessive empty space between paragraphs and list items.
6. If the user input is nonsensical, gibberish, or completely unclear (e.g., "jbjfj"), politely acknowledge that you don't understand and offer to help them with information about Mahmoud's professional profile.
7. If asked about something not in the context, politely explain you only have information about Mahmoud's professional profile and suggest they contact him directly.

Mahmoud Mohamed's Information:
- Name: ${profile.userName}
- Title: ${profile.title}
- Email: ${profile.email}
- bio: ${profile.bio}
- Links: LinkedIn (${profile.linkedin}), GitHub (${profile.github}), Address (${profile.address})

Skills:
${skillsList}

Projects:
${projectsList}
`;
    }
}
export const chatService = new ChatService();
