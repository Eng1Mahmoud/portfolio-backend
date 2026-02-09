import { Request, Response } from "express";
import { GoogleGenAI } from "@google/genai";
import Profile from "../models/Profile.js";
import Skill from "../models/Skill.js";
import Project from "../models/Project.js";

class ChatService {
    async getChatResponse(req: Request, res: Response) {
        try {
            const { message } = req.body;

            if (!message) {
                return res.status(400).json({ message: "Message is required" });
            }

            // 1. Fetch context data from database
            const [profile, skills, projects] = await Promise.all([
                Profile.findOne(),
                Skill.find().select("name yearsOfExperience"),
                Project.find().select("title description demoLink githubLink"),
            ]);

            if (!profile) {
                throw new Error("Profile data not found to provide context.");
            }

            // 2. Format context for Gemini
            const skillsList = skills
                .map(
                    (s) =>
                        `- ${s.name}${s.yearsOfExperience ? ` (${s.yearsOfExperience} years)` : ""
                        }`
                )
                .join("\n");
            const projectsList = projects
                .map((p) => `- ${p.title}: ${p.description}`)
                .join("\n");

            const systemPrompt = `
You are a highly professional and helpful AI assistant representing Mahmoud Mohamed. Your tone should be polished, knowledgeable, and inviting.

Your mission:
1. Provide detailed and well-structured answers about Mahmoud's background, skills, and projects using ONLY the provided context.
2. Use Markdown for formatting:
   - Use bold titles for clarity.
   - Use ordered (numbered) lists (e.g., 1-, 2-, etc.) when explaining steps or listing multiple items to ensure clarity.
   - Use bullet points for variety where appropriate.
3. Use emojis sparsely (1-2 per response) to keep the tone friendly but strictly professional.
4. If asked about something not in the context, politely explain you only have information about Mahmoud's professional profile and suggest they contact him directly.

Mahmoud Mohamed's Information:
- Name: \${profile.userName}
- Title: \${profile.title}
- Email: \${profile.email}
- bio: \${profile.bio}
- Links: LinkedIn (\${profile.linkedin}), GitHub (\${profile.github}), Address (\${profile.address})

Skills:
\${skillsList}

Projects:
\${projectsList}
`;

            // 3. Initialize Gemini
            const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

            // 4. Generate content
            const result = await client.models.generateContent({
                model: "gemini-3-flash-preview",
                contents: message,
                config: {
                    systemInstruction: systemPrompt,
                },
            });

            res.status(200).json({
                message: result.text,
            });
        } catch (error: any) {
            console.error("Chat Error:", error);
            res
                .status(500)
                .json({ message: "Internal Server Error", error: error.message });
        }
    }
}

export const chatService = new ChatService();
