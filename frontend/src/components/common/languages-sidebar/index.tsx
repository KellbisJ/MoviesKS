import { LanguageISOCode, langKeys } from '@/types/languages';
import { useEffect, useState } from 'react';
import { useLanguages } from '@/context/lang';
import { Check } from 'lucide-react';
import { useMenuLang } from '@/hooks/use-menu-lang';

const LanguagesSideBar = (): React.JSX.Element => {
	const { language, setLanguageLS } = useLanguages();

	const { menuLangValues, menuLangStored, updateMenuLang } = useMenuLang();

	const [languagesAvailable, setLanguagesAvailable] = useState<
		{ code: LanguageISOCode; name: string }[]
	>([]);

	const [once, setOnce] = useState<boolean>(false);

	useEffect(() => {
		const combined = langKeys.map((code, index) => ({
			code,
			name: menuLangValues[index],
		}));

		const sorted = [...combined].sort((a, b) => {
			if (a.code === language) return -1;
			if (b.code === language) return 1;
			return 0;
		});

		setLanguagesAvailable(sorted);
	}, [menuLangValues]);

	const handleSelectLanguage = (lang: LanguageISOCode) => {
		return new Promise<void>((resolve, reject) => {
			setLanguageLS(lang);
			setOnce(true);
			resolve();
		});
	};

	// console.log(languagesAvailable);

	return (
		<div className="absolute w-44 h-60 lg:w-56 lg:h-80  top-10 right-0 lg:p-2 bg-blue-100 dark:bg-[#14273c] rounded-lg overflow-y-auto scrollbar-minimal text-sm transition text-gray-800 dark:text-gray-100">
			<div className="flex flex-col p-2 gap-2.5">
				<p className="font-bold text-base">
					{menuLangStored === 'en' ? 'Menu Language:' : 'Idioma del Menú:'}
				</p>

				<div className="flex flex-col lg:flex-row justify-between">
					<button
						type="button"
						onClick={() => updateMenuLang('es')}
						className={`p-2 rounded-md hover:bg-white dark:hover:bg-[#4a5568] duration-150 ${
							menuLangStored === 'es' ? 'bg-white dark:bg-[#4a5568]' : ''
						}`}>
						Español
					</button>
					<button
						type="button"
						onClick={() => updateMenuLang('en')}
						className={`p-2 rounded-md hover:bg-white dark:hover:bg-[#4a5568] duration-150 ${
							menuLangStored === 'en' ? 'bg-white dark:bg-[#4a5568]' : ''
						}`}>
						English
					</button>
				</div>
			</div>

			<div className="flex flex-col gap-2.5 w-full h-full p-2">
				<p className="font-bold text-base">
					{menuLangStored === 'en' ? 'Page Language:' : 'Idioma de la Página:'}
				</p>
				{languagesAvailable.length > 0 &&
					languagesAvailable.map((lang) => (
						<button
							key={lang.code}
							className={`p-2 lg:p-3.5 cursor-pointer break-words hover:bg-white dark:hover:bg-[#4a5568] rounded-md duration-150 relative ${
								lang.code === language ? 'bg-white dark:bg-[#4a5568]' : ''
							}`}
							onClick={() => {
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
