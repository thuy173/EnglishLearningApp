import { GoogleGenerativeAI } from '@google/generative-ai';
import { VocabularyReq, VocabularyRes } from '../types/vocabulary';
import { ENV } from '../config/env';

export class GoogleAIService {
    private genAI: GoogleGenerativeAI;

    constructor() {
        this.genAI = new GoogleGenerativeAI(ENV.GOOGLE_AI_API_KEY);
    }

    async generateVocabulary(req: VocabularyReq): Promise<VocabularyRes[]> {
        const prompt = `
      Generate ${req.count} English vocabulary words for the topic "${req.topic} in level ${req.levelName}":
      - Ensure JSON format
      - Include pronunciation, definition, example
      - Meaning: Vietnamese meaning
      - Definition: English word's definition
      Format:
      [
        {
          "word": "string",
          "ipa": "string",
          "meaning": "string",
          "synonym": "string",
          "definition": "string",
          "example": "string",
          "collocation": "string",
          "status": "ACTIVE",
          "levelId": ${req.levelId},
        }
      ]
    `;

        try {
            const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            // JSON parsing logic
            const cleanText = text
                .replace(/```(json)?/g, '')
                .trim();

            const vocabularyList: VocabularyRes[] = JSON.parse(cleanText);
            return vocabularyList;
        } catch (error) {
            console.error('Vocabulary generation error:', error);
            throw new Error('Failed to generate vocabulary');
        }
    }
}