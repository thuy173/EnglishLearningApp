import { Request, Response } from 'express';
import { GoogleAIService } from '../services/googleAiService';
import { VocabularyReq } from '../types/vocabulary';

export class VocabularyController {
    private googleAIService: GoogleAIService;

    constructor() {
        this.googleAIService = new GoogleAIService();
    }

    async generateVocabulary(req: Request, res: Response) {
        try {
            const vocabularyReq = req.body as VocabularyReq;
            const vocabularyList = await this.googleAIService.generateVocabulary(vocabularyReq);

            res.json(vocabularyList);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: 'Vocabulary generation failed',
                message: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
}