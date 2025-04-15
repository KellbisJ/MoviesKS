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

const LanguagesSideBar = (): React.JSX.Element => {
	const { setLanguageLS } = useLanguages();

	const [languagesAvailable, setLanguagesAvailable] = useState<string[]>([]);

	useEffect(() => {
		setLanguagesAvailable(langValuesES);
	}, []);

	const handleSelectLanguage = (lang: LanguageISOCode) => {
		return new Promise<void>((resolve, reject) => {
			setLanguageLS(lang);
			resolve();
		});
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
								handleSelectLanguage(langKeys[index])
									.then(() => {
										window.location.reload();
									})
									.catch((err) => {
										console.error(err.message);
									});
							}}>
							{language}
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
