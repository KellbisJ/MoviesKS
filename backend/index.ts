import express from 'express';
import dotenv from 'dotenv';
import { config } from './api/config';
import { securityHeadersMiddleware } from './api/middleware/SecurityHeaders';
import { CorsMiddleware } from './api/middleware';
import routes from './api/routes';

dotenv.config();

const app = express();

app.use(CorsMiddleware);
app.use(securityHeadersMiddleware);

app.use('/api', routes);

app.listen(config.port, () =>
	console.log(`Server running in ${config.environment} mode on port ${config.port}`)
);
