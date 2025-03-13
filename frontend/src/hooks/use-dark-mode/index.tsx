import { useEffect, useLayoutEffect, useState } from 'react';

const useDarkMode = () => {
	const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
		if (typeof window !== 'undefined') {
			const savedMode = localStorage.getItem('MOVIESKS_DARK_MODE');
			return savedMode ? JSON.parse(savedMode) : window.matchMedia('(prefers-color-scheme: dark)').matches;
		}
		return false;
	});

	useLayoutEffect(() => {
		const root = window.document.documentElement;
		if (isDarkMode) {
			root.classList.add('dark');
		} else {
			root.classList.remove('dark');
		}
		// console.log('isDarkMode:', isDarkMode);
		// console.log('root.classList.contains("dark"):', root.classList.contains('dark'));
	}, [isDarkMode]);

	useEffect(() => {
		localStorage.setItem('MOVIESKS_DARK_MODE', JSON.stringify(isDarkMode));
	}, [isDarkMode]);

	return [isDarkMode, setIsDarkMode] as const;
};

export { useDarkMode };
