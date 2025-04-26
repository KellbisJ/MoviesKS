import { config } from './config';
import app from '../index';

const initializeServer = async () => {
	try {
		if (!process.env.API_KEY) {
			throw new Error('Missing TMDB API_KEY environment variable');
		}

		if (process.env.VERCEL_ENV !== 'production') {
			app.listen(config.port, () => {
				console.log(`Server running on port ${config.port}`);
			});
		}
	} catch (error) {
		console.error('Server initialization failed:', error);
	}
};

export { initializeServer };
