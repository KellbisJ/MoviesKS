import axios from 'axios';
import { config } from './config';
import { initializeValidLanguages, VALID_LANGUAGES } from './middleware/LanguageHandler';
import { LanguageISOCode } from './routes/configurations/languages/types';

const initializeServer = async () => {
	try {
		// Def lang
		VALID_LANGUAGES.add('es-MX' as LanguageISOCode);

		const res = await axios.get<LanguageISOCode[]>(
			`https://api.themoviedb.org/3/configuration/primary_translations?api_key=${process.env.API_KEY}`
		);

		const languageCodes = res.data;
		initializeValidLanguages(languageCodes);

		const app = (await import('../index')).default;
		app.listen(config.port, () => {
			console.log(`Server running in ${config.environment} mode on port ${config.port}`);
		});
	} catch (error) {
		console.error('Failed to initialize server:', error);

		// FALLBACK Start server with default language only
		const app = (await import('../index')).default;
		app.listen(config.port, () => {
			console.log(`Server running with default language only`);
		});
	}
};

export { initializeServer };
