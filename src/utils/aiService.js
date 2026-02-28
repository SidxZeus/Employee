import { GoogleGenAI } from '@google/genai';

// Initialize the API using the environment variable
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export const generateTaskDetails = async (taskTitle) => {
    try {
        const prompt = `
      Act as a professional project manager. I am creating a task for my employee titled: "${taskTitle}".
      Please provide a 2-3 sentence detailed description for this task explaining what needs to be done. 
      Also, suggest a single-word category for it (e.g., Development, Design, QA, Marketing, Administration).
      
      Format your response exactly like this JSON, and nothing else:
      {
        "description": "your detailed description here",
        "category": "Your Category"
      }
    `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        // Clean up any markdown formatting to ensure we only have valid JSON
        const resultText = response.text.replace(/```json|```/g, '').trim();
        return JSON.parse(resultText);

    } catch (error) {
        console.error("AI Generation failed:", error);
        return null;
    }
};
