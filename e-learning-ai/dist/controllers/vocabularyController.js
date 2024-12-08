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
exports.VocabularyController = void 0;
const googleAiService_1 = require("../services/googleAiService");
class VocabularyController {
    constructor() {
        this.googleAIService = new googleAiService_1.GoogleAIService();
    }
    generateVocabulary(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vocabularyReq = req.body;
                const vocabularyList = yield this.googleAIService.generateVocabulary(vocabularyReq);
                res.json(vocabularyList);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({
                    error: 'Vocabulary generation failed',
                    message: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
    }
}
exports.VocabularyController = VocabularyController;
