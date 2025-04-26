import { LanguagesInterface, LanguageISOCode, langKeys } from '@/types/languages';
import { createContext, useContext, useEffect, useState } from 'react';
import { LanguageContextInterface } from './types';
import { getConfigLanguages } from '@/services/configuration-languages';

const DEFAULT_LANG = 'es-MX' as LanguageISOCode;
const LANG_STORAGE_KEY: string = 'MOVIESKS_LANG';

const LanguageContext = createContext<LanguageContextInterface>({
	language: 'es-MX',
	getLanguageLS: () => 'es-MX',
	setLanguageLS: (newLanguage: LanguageISOCode): void => {},
});

const LanguagesProvider = ({ children }: { children: React.ReactNode }) => {
	const [language, setLanguage] = useState<LanguageISOCode>(DEFAULT_LANG);

	const getLanguageLS = (): LanguageISOCode => {
		const stored = localStorage.getItem(LANG_STORAGE_KEY);
		if (!stored) {
			console.warn('Language not set in localStorage, using default');
			localStorage.setItem(LANG_STORAGE_KEY, DEFAULT_LANG);
			return DEFAULT_LANG;
		}

		return stored as LanguageISOCode;
	};

	const setLanguageLS = (newLanguage: LanguageISOCode): void => {
		if (!newLanguage) {
			throw new Error(`Invalid language: ${newLanguage}`);
		}
		localStorage.setItem(LANG_STORAGE_KEY, newLanguage);
		setLanguage(newLanguage);
	};

	useEffect(() => {
		setLanguageLS(getLanguageLS());
	}, []);

	return (
		<LanguageContext.Provider value={{ language, getLanguageLS, setLanguageLS }}>
			{children}
		</LanguageContext.Provider>
	);
};

const useLanguages = () => useContext(LanguageContext);

export { LanguagesProvider, useLanguages, LANG_STORAGE_KEY, DEFAULT_LANG };
