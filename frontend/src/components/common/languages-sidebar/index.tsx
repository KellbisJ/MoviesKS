import {
	LanguageISOCode,
	LanguagesInterface,
	langKeys,
	languagesEN,
	languagesES,
	langValuesEN,
	langValuesES,
} from '@/types/languages';
import { useEffect, useState } from 'react';
import { useLanguages } from '@/context/lang';
import { Check } from 'lucide-react';

const LanguagesSideBar = (): React.JSX.Element => {
	const { language, setLanguageLS } = useLanguages();

	const [languagesAvailable, setLanguagesAvailable] = useState<string[]>([]);

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

	const isSpanishTranslation = spanishLangs.some((lang) => language === lang);

	useEffect(() => {
		setLanguagesAvailable([]);
		if (isSpanishTranslation) {
			setLanguagesAvailable(langValuesES);
		} else {
			setLanguagesAvailable(langValuesEN);
		}

		// console.log(language);
		// console.log(isSpanishTranslation);
	}, []);

	const handleSelectLanguage = (lang: LanguageISOCode) => {
		return new Promise<void>((resolve, reject) => {
			setLanguageLS(lang);
			resolve();
		});
	};

	// console.log(languagesAvailable);

	return (
		<div className="absolute h-64 w-44 top-10 right-0 p-4 bg-blue-100 dark:bg-[#14273c] rounded-lg overflow-y-auto scrollbar-minimal text-sm">
			<div className="flex flex-col gap-2.5 w-full h-full ">
				{languagesAvailable.length > 0 &&
					languagesAvailable.map((lang, index) => (
						<div
							key={index}
							className="p-2 cursor-pointer break-words text-gray-800 dark:text-gray-100 hover:bg-white dark:hover:bg-[#4a5568] rounded-md duration-150 relative"
							onClick={(e) => {
								handleSelectLanguage(langKeys[index])
									.then(() => {
										// e.
										window.location.reload();
									})
									.catch((err) => {
										console.error(err.message);
									});
							}}>
							{lang}
							{langKeys[index] === language && (
								<Check size={14} className="absolute top-1 right-1 text-green-500" />
							)}
						</div>
					))}
			</div>
		</div>
	);
};

export { LanguagesSideBar };
