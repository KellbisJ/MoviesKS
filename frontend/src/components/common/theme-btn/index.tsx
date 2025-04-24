import React from 'react';
import { useDarkMode } from '@/hooks/use-dark-mode';
import { Sun, Moon } from 'lucide-react';

const ThemeBtn = (): React.JSX.Element => {
	const [isDarkMode, setIsDarkMode] = useDarkMode();
	return (
		<button
			type="button"
			className="p-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-600 hover:text-cyan-500 dark:text-gray-300 hover:bg-cyan-500  dark:hover:bg-cyan-500 transition-colors duration-300"
			onClick={() => setIsDarkMode(!isDarkMode)}
			aria-label={isDarkMode ? 'Light mode' : 'Dark mode'}>
			{isDarkMode ? (
				<Sun className="text-yellow-500" size={20} />
			) : (
				<Moon className="text-black" size={20} />
			)}
		</button>
	);
};

export { ThemeBtn };
