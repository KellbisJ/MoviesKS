import { LanguagesInterface } from '../routes/configurations/languages/types';

declare global {
	namespace Express {
		interface Request {
			lang: {
				languageContext: LanguagesInterface['iso_639_1'];
				isValid: boolean;
			};
		}
	}
}

export {};
