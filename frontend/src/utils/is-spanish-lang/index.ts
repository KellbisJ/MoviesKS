import { LanguageISOCode } from '@/types/languages';

const spanishLangs: LanguageISOCode[] = [
	'es-AR',
	'es-CL',
	'es-DO',
	'es-EC',
	'es-GQ',
	'es-GT',
	'es-HN',
	'es-MX',
	'es-NI',
	'es-PA',
	'es-PE',
	'es-PY',
	'es-SV',
	'es-UY',
	'es-ES',
];

const isSpanishLang = (language: LanguageISOCode) => spanishLangs.includes(language);

export { isSpanishLang, spanishLangs };
