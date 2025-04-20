import { LanguageISOCode, langKeys, langValuesEN, langValuesES } from '@/types/languages';
import { useEffect, useState } from 'react';
import { useLanguages } from '@/context/lang';
import { Check } from 'lucide-react';
import { isSpanishLang } from '@/utils/is-spanish-lang';

const LanguagesSideBar = (): React.JSX.Element => {
	const { language, setLanguageLS } = useLanguages();

	const [languagesAvailable, setLanguagesAvailable] = useState<
		{ code: LanguageISOCode; name: string }[]
	>([]);
	const [once, setOnce] = useState<boolean>(false);

	// const isSpanishTranslation = spanishLangs.some((lang) => language === lang);

	useEffect(() => {
		const langValues = isSpanishLang(language) ? langValuesES : langValuesEN;
		const combined = langKeys.map((code, index) => ({
			code,
			name: langValues[index],
		}));

		const sorted = [...combined].sort((a, b) => {
			if (a.code === language) return -1;
			if (b.code === language) return 1;
			return 0;
		});

		setLanguagesAvailable(sorted);
	}, []);

	const handleSelectLanguage = (lang: LanguageISOCode) => {
		return new Promise<void>((resolve, reject) => {
			setLanguageLS(lang);
			setOnce(true);
			resolve();
		});
	};

	// console.log(languagesAvailable);

	return (
		<div className="absolute w-36 h-56 sm:w-44 sm:h-64  top-10 right-0 sm:p-2 bg-blue-100 dark:bg-[#14273c] rounded-lg overflow-y-auto scrollbar-minimal text-sm transition">
			<div className="flex flex-col gap-2.5 w-full h-full p-2">
				{languagesAvailable.length > 0 &&
					languagesAvailable.map((lang) => (
						<button
							key={lang.code}
							className={`p-2 sm:p-3.5 cursor-pointer break-words text-gray-800 dark:text-gray-100 hover:bg-white dark:hover:bg-[#4a5568] rounded-md duration-150 relative ${
								lang.code === language ? 'bg-white dark:bg-[#4a5568]' : ''
							}`}
							onClick={(e) => {
								handleSelectLanguage(lang.code)
									.then(() => {
										window.location.reload();
									})
									.catch((err) => {
										console.error(err.message);
									});
							}}
							disabled={once}
							aria-label={lang.name}>
							{lang.name}
							{lang.code === language && (
								<Check size={16} className="absolute top-0.5 right-0.5 text-green-500" /> // Mark selected language to know
							)}
						</button>
					))}
			</div>
		</div>
	);
};

export { LanguagesSideBar };
