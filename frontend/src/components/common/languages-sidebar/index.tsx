import { getConfigLanguages } from '@/services/configuration-languages';
import { LanguagesInterface } from '@/types/languages';
import { useEffect, useState } from 'react';

const LanguagesSideBar = (): React.JSX.Element => {
	const [languagesAvailable, setLanguagesAvailable] = useState<LanguagesInterface[]>([]);
	useEffect(() => {
		const fetchLangData = async () => {
			const data = await getConfigLanguages();
			setLanguagesAvailable(data);
		};
		fetchLangData();
	}, []);

	console.log(languagesAvailable);

	return (
		<div className="absolute h-60 w-40 top-10 right-0 p-2 bg-slate-700">
			<div className="bg-slate-700 p-2 w-full h-full overflow-y-auto">
				{languagesAvailable.length > 0 ? (
					languagesAvailable.map((language, index) => (
						<div key={index}>
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
