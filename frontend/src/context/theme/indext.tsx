import { createContext, useEffect, useContext } from 'react';
import { useDarkMode } from '@/hooks/use-dark-mode';

const ThemeContext = createContext(false);

const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [isDarkMode, setIsDarkMode] = useDarkMode();

	useEffect(() => {
		setIsDarkMode(isDarkMode);
	}, [isDarkMode]);

	// console.log(isDarkMode);

	return <ThemeContext.Provider value={isDarkMode}>{children}</ThemeContext.Provider>;
};

const useFavoriteContext = () => useContext(ThemeContext);

export { ThemeContextProvider, useFavoriteContext };
