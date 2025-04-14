import { LanguagesInterface } from '@/types/languages';
import { createContext, useContext, useEffect, useState } from 'react';
import { LanguageContextInterface } from './types';
import { getConfigLanguages } from '@/services/configuration-languages';

const LANG_STORAGE_KEY: string = 'MOVIESKS_LANG';
const DEFAULT_LANG: string = 'es';

const initialContextValues = {
	language: DEFAULT_LANG,
	langReqData: [],
	validLanguages: [],
	getLanguageLS: () => DEFAULT_LANG,
	setLanguageLS: (): void => {},
};

const LanguageContext = createContext<LanguageContextInterface>(initialContextValues);

const LanguagesProvider = ({ children }: { children: React.ReactNode }) => {
	const [language, setLanguage] = useState<string>(DEFAULT_LANG);
	const [langReqData, setLangReqData] = useState<LanguagesInterface[]>([]);
	const [validLanguages, setValidLanguages] = useState<LanguagesInterface['iso_639_1'][]>([]);

	const getLanguageLS = (): string => {
		const stored = localStorage.getItem(LANG_STORAGE_KEY);
		if (!stored) {
			console.warn('Language not set in localStorage, using default');
			localStorage.setItem(LANG_STORAGE_KEY, DEFAULT_LANG);
			return DEFAULT_LANG;
		}
		// Only enforce check if validLanguages has been loaded
		if (validLanguages.length > 0 && !validLanguages.includes(stored)) {
			return DEFAULT_LANG;
		}
		return stored;
	};

	const setLanguageLS = (newLanguage: string): void => {
		if (validLanguages.length > 0 && !validLanguages.includes(newLanguage)) {
			throw new Error(`Invalid language: ${newLanguage}`);
		}
		localStorage.setItem(LANG_STORAGE_KEY, newLanguage);
		setLanguage(newLanguage);
	};

	useEffect(() => {
		const initialLang = getLanguageLS();
		setLanguage(initialLang);
	}, []);

	useEffect(() => {
		const fetchValidLanguages = async () => {
			const dataLang = await getConfigLanguages(); // Make sure to import this function
			const languageCodes = dataLang.map((l: LanguagesInterface) => l.iso_639_1);

			setLangReqData(dataLang);
			setValidLanguages(languageCodes);
		};
		fetchValidLanguages();
	}, []);
	return (
		<LanguageContext.Provider
			value={{ language, langReqData, validLanguages, getLanguageLS, setLanguageLS }}>
			{children}
		</LanguageContext.Provider>
	);
};

const useLanguages = () => useContext(LanguageContext);

export { LanguagesProvider, useLanguages, LANG_STORAGE_KEY, DEFAULT_LANG };
