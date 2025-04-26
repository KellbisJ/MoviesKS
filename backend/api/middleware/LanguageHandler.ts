/// <reference path="../types/express.d.ts" />

import axios from 'axios';
import { Request, Response, NextFunction } from 'express';
import { LanguageISOCode } from '../routes/configurations/languages/types';

const DEFAULT_LANG = 'es-MX' as LanguageISOCode;
let VALID_LANGUAGES = new Set<LanguageISOCode>([DEFAULT_LANG]);
let isInitializing = false;
let initializationPromise: Promise<void> | null = null;

const initializeValidLanguages = (languages: LanguageISOCode[]) => {
	VALID_LANGUAGES = new Set([...VALID_LANGUAGES, ...languages]);
	console.log(`Valid languages updated (${VALID_LANGUAGES.size})`);
};

const languageMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	if (!initializationPromise) {
		initializationPromise = initializeLanguages();
	}

	try {
		await initializationPromise;
	} catch (error) {
		console.error('Language system degraded - using defaults');
	}

	const contextHeader = req.header('X-LANG-CONTEXT') as LanguageISOCode;
	const isValid = VALID_LANGUAGES.has(contextHeader);

	req.lang = {
		languageContext: isValid ? contextHeader : DEFAULT_LANG,
		isValid,
	};

	res.set('X-LANG-CONTEXT', req.lang.languageContext);
	next();
};

async function initializeLanguages() {
	if (isInitializing) return;
	isInitializing = true;

	try {
		const res = await axios.get<LanguageISOCode[]>(
			`https://api.themoviedb.org/3/configuration/primary_translations?api_key=${process.env.API_KEY}`,
			{
				headers: {
					'Cache-Control': 'public, max-age=86400',
				},
			}
		);
		initializeValidLanguages(res.data);
	} catch (error) {
		console.error('Language init failed:', error);
		initializationPromise = null;
		throw error;
	} finally {
		isInitializing = false;
	}
}

initializeLanguages();

export { VALID_LANGUAGES, initializeValidLanguages, languageMiddleware };
