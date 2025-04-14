import { LanguagesInterface } from '@/types/languages';
import { useEffect, useState } from 'react';
import { useLanguages } from '@/context/lang';

const LanguagesSideBar = (): React.JSX.Element => {
	const { langReqData, setLanguageLS } = useLanguages();

	const [languagesAvailable, setLanguagesAvailable] = useState<LanguagesInterface[]>([]);

	const languageCodes = langReqData.map((l) => l.iso_639_1);

	useEffect(() => {
		setLanguagesAvailable(langReqData);
	}, []);

	const handleSelectLanguage = (lang: LanguagesInterface['iso_639_1']) => {
		setLanguageLS(lang);
	};

	// console.log(languagesAvailable);

	return (
		<div className="absolute h-64 w-44 top-10 right-0 p-2 bg-slate-700 rounded">
			<div className="flex flex-col gap-2.5 p-2 w-full h-full overflow-y-auto scrollbar-minimal">
				{languagesAvailable.length > 0 ? (
					languagesAvailable.map((language, index) => (
						<div
							key={index}
							className="p-1 cursor-pointer bg-slate-200 rounded break-words"
							onClick={() => {
								handleSelectLanguage(language.iso_639_1);
							}}>
							{language.english_name !== 'No Language' && <p>{language.english_name}</p>}
						</div>
					))
				) : (
					<p>asdhjahdasd</p>
				)}
			</div>
		</div>
	);
};

export { LanguagesSideBar };
