import { LanguageISOCode } from '@/types/languages';
import { createContext, useContext, useMemo, useState } from 'react';
import { LanguageContextInterface } from './types';

const DEFAULT_LANG = 'es-MX' as LanguageISOCode;
const LANG_STORAGE_KEY: string = 'MOVIESKS_LANG';

const LanguageContext = createContext<LanguageContextInterface | undefined>(undefined);

const LanguagesProvider = ({ children }: { children: React.ReactNode }) => {
	const [language, setLanguage] = useState<LanguageISOCode>(() => {
		return (localStorage.getItem(LANG_STORAGE_KEY) as LanguageISOCode) || DEFAULT_LANG;
	});

	const contextValue = useMemo<LanguageContextInterface>(
		() => ({
			language,
			setLanguageLS: (newLanguage: LanguageISOCode) => {
				if (!newLanguage) {
					console.error('Incorrect language, could not be used');
				}
				localStorage.setItem(LANG_STORAGE_KEY, newLanguage);
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

export { LanguagesProvider, useLanguages, LANG_STORAGE_KEY, DEFAULT_LANG };
