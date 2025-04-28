import express from 'express';
import dotenv from 'dotenv';
// import { config } from './api/config';
import { CorsMiddleware } from './api/middleware';
import { securityHeadersMiddleware } from './api/middleware/SecurityHeaders';
import { languageMiddleware } from './api/middleware/LanguageHandler';
import routes from './api/routes';
import { initializeServer } from './api/bootstrap';

dotenv.config();

const app = express();

app.use(CorsMiddleware);
app.use(securityHeadersMiddleware);
app.use(languageMiddleware);
app.use('/api', routes);

export default app;

initializeServer().catch((error) => {
	console.error('Failed to initialize server:', error);
	process.exit(1);
});
