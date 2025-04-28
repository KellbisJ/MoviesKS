import { LanguageISOCode } from '@/types/languages';
import { createContext, useContext, useMemo, useState } from 'react';
import { LanguageContextInterface } from './types';

const DEFAULT_LANG = 'es-MX' as LanguageISOCode;
const LANG_STORAGE_KEY: string = 'MOVIESKS_LANG';
let currentLanguage: LanguageISOCode = DEFAULT_LANG;

const LanguageContext = createContext<LanguageContextInterface | undefined>(undefined);

const LanguagesProvider = ({ children }: { children: React.ReactNode }) => {
	const [language, setLanguage] = useState<LanguageISOCode>(() => {
		const storedLang = localStorage.getItem(LANG_STORAGE_KEY) as LanguageISOCode;
		currentLanguage = storedLang || DEFAULT_LANG;
		return currentLanguage;
	});

	const contextValue = useMemo<LanguageContextInterface>(
		() => ({
			language,
			setLanguageLS: (newLanguage: LanguageISOCode) => {
				if (!newLanguage) {
					console.error('Incorrect language');
				}
				localStorage.setItem(LANG_STORAGE_KEY, newLanguage);
				currentLanguage = newLanguage;
				setLanguage(newLanguage);
			},
		}),
		[language]
	);

	return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>;
};

const useLanguages = () => {
	const context = useContext(LanguageContext);
	if (context === undefined) {
		throw new Error('useLanguages must be used within a LanguagesProvider');
	}
	return context;
};

export { LanguagesProvider, useLanguages, LANG_STORAGE_KEY, DEFAULT_LANG, currentLanguage };
