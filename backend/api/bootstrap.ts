import {
	DEFAULT_LANG,
	initializeValidLanguages,
	VALID_LANGUAGES,
} from './middleware/LanguageHandler';
import axios from 'axios';
import { config } from './config';

const initializeServer = async () => {
	try {
		VALID_LANGUAGES.add(DEFAULT_LANG);

		const response = await axios.get(
			`https://api.themoviedb.org/3/configuration/languages?api_key=${process.env.API_KEY}`
		);

		const languageCodes = response.data.map((lang: any) => lang.iso_639_1);
		initializeValidLanguages(languageCodes);

		// Start server
		const app = (await import('../index')).default;
		app.listen(config.port, () => {
			console.log(`Server running in ${config.environment} mode on port ${config.port}`);
		});
	} catch (error) {
		console.error('Failed to initialize server:', error);
		const app = (await import('../index')).default;
		app.listen(config.port, () => {
			console.log(`Server running with default language only`);
		});
	}
};

export { initializeServer };
