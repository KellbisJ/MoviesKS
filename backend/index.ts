import express from 'express';
import dotenv from 'dotenv';
// import { config } from './api/config';
import { CorsMiddleware } from './api/middleware';
import { securityHeadersMiddleware } from './api/middleware/SecurityHeaders';
import { languageMiddleware, validateLanguage } from './api/middleware/LanguageHandler';
import routes from './api/routes';

dotenv.config();

const app = express();

app.use(CorsMiddleware);
app.use(securityHeadersMiddleware);
app.use(languageMiddleware);
// app.use(validateLanguage);
app.use('/api', routes);

export default app;

// Now bootstrap file initialize the server
if (require.main === module) {
	import('./api/bootstrap').then(({ initializeServer }) => initializeServer());
}
