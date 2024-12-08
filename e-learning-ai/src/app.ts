import express from 'express';
import { vocabularyRoutes } from './routes/vocabularyRoutes';
import { ENV } from './config/env';
import cors from 'cors';

const app = express();

// CORS Configuration
const corsOptions: cors.CorsOptions = {
    origin: [
        'http://localhost:3031',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions)); // Add CORS middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/vocabulary', vocabularyRoutes());

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err);
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message
    });
});

// Start server
app.listen(ENV.PORT, () => {
    console.log(`Server running on port ${ENV.PORT}`);
});

export default app;