"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleAIService = void 0;
const generative_ai_1 = require("@google/generative-ai");
const env_1 = require("../config/env");
class GoogleAIService {
    constructor() {
        this.genAI = new generative_ai_1.GoogleGenerativeAI(env_1.ENV.GOOGLE_AI_API_KEY);
    }
    generateVocabulary(req) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const result = yield model.generateContent(prompt);
                const response = yield result.response;
                const text = response.text();
                // JSON parsing logic
                const cleanText = text
                    .replace(/```(json)?/g, '')
                    .trim();
                const vocabularyList = JSON.parse(cleanText);
                return vocabularyList;
            }
            catch (error) {
                console.error('Vocabulary generation error:', error);
                throw new Error('Failed to generate vocabulary');
            }
        });
    }
}
exports.GoogleAIService = GoogleAIService;
