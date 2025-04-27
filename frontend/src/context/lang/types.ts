import { LanguageISOCode } from '@/types/languages';

interface LanguageContextInterface {
	language: LanguageISOCode;
	setLanguageLS: (newLanguage: LanguageISOCode) => void;
}

export { LanguageContextInterface };
