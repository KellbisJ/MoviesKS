/// <reference path="../types/express.d.ts" />

import { Request, Response, NextFunction } from 'express';
import {
	LanguageISOCode,
	LanguagesInterface,
	langKeys,
} from '../routes/configurations/languages/types';

const DEFAULT_LANG = 'es-MX' as LanguageISOCode;
let VALID_LANGUAGES = new Set<LanguageISOCode>([]);

const initializeValidLanguages = (languages: LanguageISOCode[]) => {
	// Always include default language
	VALID_LANGUAGES = new Set<LanguageISOCode>([DEFAULT_LANG, ...languages]); // Spanish mx default
	console.log(`Initialized ${VALID_LANGUAGES.size} valid languages`);
};

const languageMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const contextHeader = req.header('X-LANG-CONTEXT') as LanguageISOCode;

	const isValid = contextHeader ? VALID_LANGUAGES.has(contextHeader) : false;

	req.lang = {
		languageContext: isValid ? contextHeader! : DEFAULT_LANG,
		isValid,
	};
	console.log(req.lang);

	res.set('X-LANG-CONTEXT', req.lang.languageContext);
	next();
};
export { VALID_LANGUAGES, initializeValidLanguages, languageMiddleware };
