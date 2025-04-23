import { Search } from 'lucide-react';
import React from 'react';
import { isSpanishLang } from '@/utils/is-spanish-lang';
import { useLanguages } from '@/context/lang';

const NoResults = () => {
	const { language } = useLanguages();
	const title = isSpanishLang(language) ? 'No se encontraron resultados' : 'No results found';
	const description = isSpanishLang(language)
		? 'No encontramos lo que buscas. Prueba con otras palabras clave o revisa la ortografía.'
		: "We couldn't find what you were looking for. Try other keywords or check your spelling.";
	return (
		<div className="flex flex-col items-center justify-center p-8 space-y-4 text-center">
			<div className="p-4 bg-gray-200 dark:bg-gray-800 rounded-full">
				<Search size={12} className="text-gray-400 dark:text-gray-600" />
			</div>

			<div className="space-y-2 max-w-md">
				<h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
				<p className="text-gray-500 dark:text-gray-400">{description}</p>
			</div>
		</div>
	);
};

export { NoResults };
