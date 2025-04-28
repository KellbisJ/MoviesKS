import { Request, Response, NextFunction } from 'express';
import { LanguageISOCode } from '../routes/configurations/languages/types';

const DEFAULT_LANG = 'es-MX' as LanguageISOCode;

declare global {
	namespace Express {
		interface Request {
			lang: LanguageISOCode;
		}
	}
}

const languageMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	const headerLang = req.header('X-LANG-CONTEXT') as LanguageISOCode;

	req.lang = headerLang || DEFAULT_LANG;

	next();
};

export { languageMiddleware };
