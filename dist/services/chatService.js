import { GoogleGenAI } from '@google/genai';
import Profile from '../models/Profile.js';
import Skill from '../models/Skill.js';
import Project from '../models/Project.js';
class ChatService {
    async getChatResponse(message) {
        // 1. Fetch context data from database
        const [profile, skills, projects] = await Promise.all([
            Profile.findOne(),
            Skill.find().select('name yearsOfExperience'),
            Project.find().select('title description demoLink githubLink'),
        ]);
        if (!profile) {
            throw new Error("Profile data not found to provide context.");
        }
        // 2. Format context for Gemini
        const skillsList = skills.map(s => `- ${s.name}${s.yearsOfExperience ? ` (${s.yearsOfExperience} years)` : ''}`).join('\n');
        const projectsList = projects.map(p => `- ${p.title}: ${p.description}`).join('\n');
        const systemPrompt = `
You are a helpful and professional AI assistant for Mahmoud Mohamed's personal portfolio website. 
Your goal is to answer questions from visitors about Mahmoud's professional background, skills, and projects based ONLY on the information provided below.

Mahmoud Mohamed's Information:
- Name: ${profile.userName}
- Title: ${profile.title}
- Email: ${profile.email}
- Address: ${profile.address}
- Bio: ${profile.bio}
- LinkedIn: ${profile.linkedin}
- GitHub: ${profile.github}

Skills:
${skillsList}

Projects:
${projectsList}

Guidelines:
- Be concise and professional.
- If you don't know the answer based on the provided info, politely suggest them to contact Mahmoud directly via his email or LinkedIn.
- Act as his personal representative.
- Format your response in a way that looks good in a chat window .
`;
        // 3. Initialize Gemini
        const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        // 4. Generate content
        const result = await client.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: message,
            config: {
                systemInstruction: systemPrompt,
            }
        });
        return result.text;
    }
}
export default new ChatService();
