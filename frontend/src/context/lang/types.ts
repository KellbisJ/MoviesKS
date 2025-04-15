import { LanguageISOCode } from '@/types/languages';

interface LanguageContextInterface {
	language: LanguageISOCode;
	getLanguageLS: () => LanguageISOCode;
	setLanguageLS: (newLanguage: LanguageISOCode) => void;
}

export { LanguageContextInterface };
