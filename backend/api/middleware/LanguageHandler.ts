import { Request, Response, NextFunction } from 'express';
import { LanguageISOCode } from '../routes/addons/types';

const DEFAULT_LANG = 'es-MX' as LanguageISOCode;

declare global {
	namespace Express {
		interface Request {
			pageLanguageCustomHeader: LanguageISOCode;
		}
	}
}

const languageMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	const headerLang = req.header('X-LANG-CONTEXT') as LanguageISOCode;

	req.pageLanguageCustomHeader = headerLang || DEFAULT_LANG;

	next();
};

export { languageMiddleware };
