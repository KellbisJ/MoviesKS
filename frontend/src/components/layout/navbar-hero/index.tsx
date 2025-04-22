import { Link } from 'react-router-dom';
import { useDarkMode } from '@/hooks/use-dark-mode';
import { House, Film, Tv, Save, Sun, Moon, Languages } from 'lucide-react';
import { LanguagesSideBar } from '@/components/common/languages-sidebar';
import { useEffect, useState } from 'react';
import { isSpanishLang } from '@/utils/is-spanish-lang';
import { useLanguages } from '@/context/lang';

const NavbarHero = (): React.JSX.Element => {
	const { language } = useLanguages();
	const [isDarkMode, setIsDarkMode] = useDarkMode();

	const [showLangSidebar, setShowLangSideBar] = useState<boolean>(false);

	const [labels, setLabels] = useState<{
		home: string;
		movies: string;
		tv: string;
		saved: string;
	}>({
		home: 'Inicio',
		movies: 'Películas',
		tv: 'Series de TV',
		saved: 'Guardado',
	});

	useEffect(() => {
		if (!isSpanishLang(language)) {
			setLabels((prevLabels) => ({
				...prevLabels,
				home: 'Home',
				movies: 'Movies',
				tv: 'TV Series',
				saved: 'Saved',
			}));
		}
	}, [language]);

	return (
		<nav className="bg-transparent transition h-14">
			<div className="container mx-auto px-4 sm:px-6 py-3">
				<div className="flex items-start sm:items-center justify-between">
					{/* Mobile Navigation (left side) */}
					<div className="flex sm:hidden gap-3">
						{[
							{ to: '/', label: labels.home, icon: House },
							{
								to: '/movie',
								label: labels.movies,
								icon: Film,
							},
							{
								to: '/tv',
								label: labels.tv,
								icon: Tv,
							},
							{
								to: '/saved-media',
								label: labels.saved,
								icon: Save,
							},
						].map((item) => (
							<Link
								key={item.to}
								to={item.to}
								className="flex flex-col items-center gap-1 text-gray-600 hover:text-cyan-500 
                                   dark:text-gray-300 dark:hover:text-cyan-400 
                                   transition-colors duration-200 text-xs"
								aria-label={item.label}>
								<item.icon size={14} className="flex-shrink-0" />
								<span>{item.label}</span>
							</Link>
						))}
					</div>

					{/* Desktop*/}
					<h2 className="hidden sm:block text-xl font-bold text-gray-800 dark:text-gray-100 dark:hover:text-cyan-500 hover:text-cyan-500 transition-colors duration-300">
						<Link to="/">MoviesKS</Link>
					</h2>

					{/* Desktop Navigation (center) */}
					<div className="hidden sm:flex items-center gap-6">
						{[
							{ to: '/', label: labels.home, icon: House },
							{ to: '/movie', label: labels.movies, icon: Film },
							{ to: '/tv', label: labels.tv, icon: Tv },
							{ to: '/saved-media', label: labels.saved, icon: Save },
						].map((item) => (
							<Link
								key={item.to}
								to={item.to}
								className="flex items-center gap-2 text-gray-600 hover:text-cyan-500 dark:text-gray-300 dark:hover:text-cyan-500 transition-colors duration-300 text-sm"
								aria-label={item.label}>
								<item.icon size={20} className="flex-shrink-0" />
								<span className="font-medium">{item.label}</span>
							</Link>
						))}
					</div>

					{/* Right side ( for both mobile/desktop) */}
					<div className="flex items-start sm:items-center gap-2 sm:gap-3 relative">
						<button
							type="button"
							className="p-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-600 hover:text-cyan-500 dark:text-gray-300 hover:bg-cyan-500 dark:hover:bg-cyan-500 transition-colors duration-300"
							aria-label={'translate'}
							onClick={() => {
								setShowLangSideBar(!showLangSidebar);
							}}>
							{<Languages size={20} className="text-black dark:text-gray-300" />}
						</button>

						{showLangSidebar && <LanguagesSideBar />}

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
					</div>
				</div>
			</div>
		</nav>
	);
};

export { NavbarHero };
