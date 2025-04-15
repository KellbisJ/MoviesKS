import { LanguageISOCode } from '../routes/configurations/languages/types';

declare global {
	namespace Express {
		interface Request {
			lang: {
				languageContext: LanguageISOCode;
				isValid: boolean;
			};
		}
	}
}

export {};
