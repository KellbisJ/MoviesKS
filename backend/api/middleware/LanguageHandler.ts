/// <reference path="../types/express.d.ts" />

import { Request, Response, NextFunction } from 'express';
import { LanguagesInterface } from '../routes/configurations/languages/types';

const DEFAULT_LANG: string = 'es';
let VALID_LANGUAGES = new Set<LanguagesInterface['iso_639_1']>([]);

const initializeValidLanguages = (languages: string[]) => {
	// Always include default language
	VALID_LANGUAGES = new Set([DEFAULT_LANG, ...languages]);
	console.log(`Initialized ${VALID_LANGUAGES.size} valid languages`);
};

const languageMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const contextHeader = req.header('X-LANG-CONTEXT');

	const isValid = contextHeader ? VALID_LANGUAGES.has(contextHeader) : false;

	req.lang = {
		languageContext: isValid ? contextHeader! : DEFAULT_LANG,
		isValid,
	};
	console.log(req.lang);

	res.set('X-LANG-CONTEXT', req.lang.languageContext);
	next();
};

const validateLanguage = (req: Request, res: Response, next: NextFunction): void => {
	if (!req.lang.isValid) {
		res.status(400).json({
			error: `Invalid language: ${req.header('X-LANG-CONTEXT')}`,
			validLanguages: Array.from(VALID_LANGUAGES),
		});
		return; // Explicit return
	}
	return next(); // Fixed return path
};

export {
	DEFAULT_LANG,
	VALID_LANGUAGES,
	initializeValidLanguages,
	languageMiddleware,
	validateLanguage,
};
