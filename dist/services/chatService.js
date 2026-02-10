import { GoogleGenAI } from "@google/genai";
import Profile from "../models/Profile.js";
import Skill from "../models/Skill.js";
import Project from "../models/Project.js";
// ─── Constants ───────────────────────────────────────────────────────
const SYSTEM_PROMPT_CACHE_DURATION = 1000 * 60 * 60; // 1 hour
const MODELS = [
    "gemini-1.5-flash",
    "gemini-2.0-flash",
    "gemini-2.5-flash",
    "gemini-3-flash-preview",
    "gemini-3-pro-preview",
    "gemini-2.5-pro",
];
// ─── Service ─────────────────────────────────────────────────────────
class ChatService {
    cachedSystemPrompt = null;
    lastCacheUpdate = 0;
    // ─── Public ──────────────────────────────────────────────────────
    /**
     * Handles an incoming chat request.
     * Builds a system prompt from portfolio data, then attempts generation
     * across multiple Gemini models with automatic failover on quota errors.
     */
    async getChatResponse(req, res) {
        try {
            const { message } = req.body;
            if (!message) {
                return res.status(400).json({ message: "Message is required" });
            }
            console.time("getSystemPrompt");
            const systemPrompt = await this.getSystemPrompt();
            console.timeEnd("getSystemPrompt");
            const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
            let lastError = null;
            for (const modelName of MODELS) {
                try {
                    console.time(`generate:${modelName}`);
                    const result = await client.models.generateContent({
                        model: modelName,
                        contents: message,
                        config: { systemInstruction: systemPrompt },
                    });
                    console.timeEnd(`generate:${modelName}`);
                    return res.status(200).json({ message: result.text });
                }
                catch (error) {
                    console.timeEnd(`generate:${modelName}`); // Ensure timer ends on error
                    console.error(`Error with model ${modelName}:`, error.message);
                    lastError = error;
                    if (error.status === 429)
                        continue; // quota exceeded → try next model
                    // If it's a timeout error (although axios timeout is not set here, vercel kills it), we might want to try next.
                    // But generally break on non-429.
                    break;
                }
            }
            // All model attempts failed
            const status = lastError?.status || 500;
            const userFriendlyMessage = status === 429
                ? "AI Quota exceeded for all available models. Please try again later."
                : status === 404
                    ? "The AI model configuration is invalid or the service is temporarily unavailable."
                    : "Internal Server Error";
            res.status(status).json({ message: userFriendlyMessage, error: lastError?.message });
        }
        catch (error) {
            console.error("ChatService Error:", error);
            res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    }
    // ─── Private ─────────────────────────────────────────────────────
    /**
     * Returns a cached system prompt, or builds a fresh one from
     * MongoDB profile data + CV content when the cache has expired.
     */
    async getSystemPrompt() {
        const now = Date.now();
        if (this.cachedSystemPrompt && now - this.lastCacheUpdate < SYSTEM_PROMPT_CACHE_DURATION) {
            return this.cachedSystemPrompt;
        }
        const [profile, skills, projects] = await Promise.all([
            Profile.findOne(),
            Skill.find().select("name yearsOfExperience"),
            Project.find().select("title description demoLink githubLink"),
        ]);
        if (!profile) {
            throw new Error("Profile data not found to provide context for the AI.");
        }
        const cvContent = profile.cvContent || "CV content not available.";
        this.cachedSystemPrompt = this.buildSystemPrompt(profile, skills, projects, cvContent);
        this.lastCacheUpdate = now;
        return this.cachedSystemPrompt;
    }
    /**
     * Assembles the full system prompt string from portfolio data.
     */
    buildSystemPrompt(profile, skills, projects, cvContent = "") {
        const skillsList = skills
            .map((s) => `- ${s.name}${s.yearsOfExperience ? ` (${s.yearsOfExperience} years)` : ""}`)
            .join("\n");
        const projectsList = projects
            .map((p) => `- ${p.title}: ${p.description}`)
            .join("\n");
        return `
You are a highly professional and helpful AI assistant representing Mahmoud Mohamed. Your tone should be polished, knowledgeable, and inviting.

Your mission:
1. Provide detailed and well-structured answers about Mahmoud's background, skills, and projects using ONLY the provided context.
2. **Consult CV Data**: Use the provided CV text below to answer specific questions about Mahmoud's work history, certifications, or detailed experiences not covered in the profile summary.
3. **Prioritize Strong Projects**: When asked about projects, always mention and detail these first: **World Chat App**, **Direct Rent**, **El-Baraka Market**, **Watch Store**, and **Bus Booking**. These represent his advanced full-stack and professional experience.
4. Use Markdown for formatting:
   - Use bold titles for clarity.
   - Use ordered (numbered) lists (e.g., 1. , 2. , etc.) when explaining steps or listing multiple items to ensure clarity.
   - Use bullet points (- or *) for listing features, skills, or projects.
   - ALWAYS use lists when providing multiple pieces of information to keep the layout organized.
5. Use emojis in a balanced way (typically 2-4 per response). They should make the response feel inviting but should not be excessive or used in every single sentence.
6. Keep vertical spacing compact: Avoid using triple newlines or excessive empty space between paragraphs and list items.
7. If the user input is nonsensical, gibberish, or completely unclear (e.g., "jbjfj"), politely acknowledge that you don't understand and offer to help them with information about Mahmoud's professional profile.
8. If asked about something not in the context, politely explain you only have information about Mahmoud's professional profile and suggest they contact him directly.

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

---
ADDITIONAL CV CONTEXT (Extracted from Mahmoud's Resume):
${cvContent || "No additional CV data available."}
---
`;
    }
}
export const chatService = new ChatService();
