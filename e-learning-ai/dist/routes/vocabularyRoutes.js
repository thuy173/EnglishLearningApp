"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vocabularyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const vocabularyController_1 = require("../controllers/vocabularyController");
const vocabularyRoutes = () => {
    const router = express_1.default.Router();
    const controller = new vocabularyController_1.VocabularyController();
    router.post('/generate', controller.generateVocabulary.bind(controller));
    return router;
};
exports.vocabularyRoutes = vocabularyRoutes;
