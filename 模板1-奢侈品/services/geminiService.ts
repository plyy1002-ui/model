import { GoogleGenAI, Type } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // Always use direct process.env.API_KEY when initializing.
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async generateReviews(productDescription: string) {
    const response = await this.ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate 3 professional and authentic customer reviews for: ${productDescription}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reviews: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["reviews"]
        }
      }
    });
    // The response.text property directly returns the string output.
    return JSON.parse(response.text || '{"reviews": []}') as { reviews: string[] };
  }

  async chatWithAssistant(message: string, context?: string) {
    const chat = this.ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `You are a high-end personal business assistant. 
        Provide concise, elegant, and professional advice. 
        Context: ${context || 'General business assistance'}`,
      },
    });
    const response = await chat.sendMessage({ message });
    // The response.text property directly returns the string output.
    return response.text;
  }
}

export const geminiService = new GeminiService();