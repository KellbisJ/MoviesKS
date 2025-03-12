import express from 'express';
import dotenv from 'dotenv';
import { config } from './api/config';
import { CorsMiddleware, SecurityHeaders } from './api/middleware/index';
import routes from './api/routes';

dotenv.config();

const app = express();

app.use(CorsMiddleware); // Middlewares
app.use(SecurityHeaders);

app.use('/api', routes); // Routes

app.listen(config.port, () => console.log(`Server running in ${config.environment} mode on port ${config.port}`));
