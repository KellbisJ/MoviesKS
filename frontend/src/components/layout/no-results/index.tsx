import { Search } from 'lucide-react';
import React from 'react';

interface NoResultsProps {
	title?: string;
	description?: string;
}

const NoResults: React.FC<NoResultsProps> = ({
	title = 'No se encontraron resultados',
	description = 'No encontramos lo que buscas. Prueba con otras palabras clave o revisa la ortografía.',
}) => {
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
