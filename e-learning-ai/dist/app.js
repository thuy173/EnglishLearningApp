"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const vocabularyRoutes_1 = require("./routes/vocabularyRoutes");
const env_1 = require("./config/env");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// CORS Configuration
const corsOptions = {
    origin: [
        'http://localhost:3031',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};
// Middleware
app.use((0, cors_1.default)(corsOptions)); // Add CORS middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// Routes
app.use('/api/vocabulary', (0, vocabularyRoutes_1.vocabularyRoutes)());
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message
    });
});
// Start server
app.listen(env_1.ENV.PORT, () => {
    console.log(`Server running on port ${env_1.ENV.PORT}`);
});
exports.default = app;
