"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.ENV = {
    GOOGLE_AI_API_KEY: process.env.GOOGLE_AI_API_KEY || '',
    PORT: process.env.PORT ? parseInt(process.env.PORT) : 8084,
};
// Validate environment
if (!exports.ENV.GOOGLE_AI_API_KEY) {
    throw new Error('Google AI API key is missing');
}
