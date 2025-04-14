import { LanguagesInterface } from '@/types/languages';

interface LanguageContextInterface {
	language: LanguagesInterface['iso_639_1'];
	langReqData: LanguagesInterface[];
	validLanguages: LanguagesInterface['iso_639_1'][];
	getLanguageLS: () => string;
	setLanguageLS: (newLanguage: string) => void;
}

export { LanguageContextInterface };
