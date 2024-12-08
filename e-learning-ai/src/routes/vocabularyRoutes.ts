import express from 'express';
import { VocabularyController } from '../controllers/vocabularyController';

export const vocabularyRoutes = () => {
    const router = express.Router();
    const controller = new VocabularyController();

    router.post('/generate',
        controller.generateVocabulary.bind(controller)
    );

    return router;
};