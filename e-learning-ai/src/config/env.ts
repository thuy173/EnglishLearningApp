import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
    GOOGLE_AI_API_KEY: process.env.GOOGLE_AI_API_KEY || '',
    PORT: process.env.PORT ? parseInt(process.env.PORT) : 8084,
};

// Validate environment
if (!ENV.GOOGLE_AI_API_KEY) {
    throw new Error('Google AI API key is missing');
}