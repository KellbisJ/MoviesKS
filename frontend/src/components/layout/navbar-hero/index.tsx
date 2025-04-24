import { Link } from 'react-router-dom';
import { Globe, Settings, User, House, Film, Tv, Save } from 'lucide-react';
import { LanguagesSideBar } from '@/components/common/languages-sidebar';
import { useEffect, useState } from 'react';
import { isSpanishLang } from '@/utils/is-spanish-lang';
import { useLanguages } from '@/context/lang';
import { ThemeBtn } from '@/components/common/theme-btn';
import { TranslateBtn } from '@/components/common/translate-btn';
import { MobileBottomNavBar } from '../mobile-bottom-navbar';

const NavbarHero = (): React.JSX.Element => {
	const { language } = useLanguages();

	const [showNavigationPathsBottomMenu, setShowNavigationPathsBottomMenu] = useState(false);
	const [showSettingsBottomMenu, setShowSettingsBottomMenu] = useState(false);
	const [showLangSidebar, setShowLangSideBar] = useState<boolean>(false);

	const [labels, setLabels] = useState<{
		home: string;
		movies: string;
		tv: string;
		saved: string;
		search: string;
	}>({
		home: 'Inicio',
		movies: 'Películas',
		tv: 'Series de TV',
		saved: 'Guardado',
		search: 'Buscar',
	});

	useEffect(() => {
		if (!isSpanishLang(language)) {
			setLabels((prevLabels) => ({
				...prevLabels,
				home: 'Home',
				movies: 'Movies',
				tv: 'TV Series',
				saved: 'Saved',
				search: 'Search',
			}));
		}
	}, [language]);

	// #16C47F good green color

	return (
		<>
			{/* Desktop*/}
			<nav className="hidden sm:block bg-[#222831]  bg-transparent  transition h-12 sm:h-14 w-full ">
				<div className="container mx-auto px-4 sm:px-6 py-3">
					<div className="flex items-start sm:items-center sm:justify-between">
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

						{/* Right side (desktop) */}
						<div className="hidden sm:flex items-start sm:items-center gap-2 sm:gap-3 relative">
							<TranslateBtn
								showLangSidebar={showLangSidebar}
								setShowLangSideBar={setShowLangSideBar}
							/>
							<ThemeBtn />

							<div
								className={`absolute top-0 right-0 rounded-lg shadow-lg transition-all duration-200 ease-out ${
									showLangSidebar
										? 'opacity-100 scale-100'
										: 'opacity-0 scale-95 pointer-events-none'
								}`}>
								{<LanguagesSideBar />}
							</div>
						</div>
					</div>
				</div>
			</nav>

			{/* Mobile*/}
			<MobileBottomNavBar
				showNavigationPathsBottomMenu={showNavigationPathsBottomMenu}
				setShowNavigationPathsBottomMenu={setShowNavigationPathsBottomMenu}
				showSettingsBottomMenu={showSettingsBottomMenu}
				setShowSettingsBottomMenu={setShowSettingsBottomMenu}
				showLangSidebar={showLangSidebar}
				setShowLangSideBar={setShowLangSideBar}
			/>
		</>
	);
};

export { NavbarHero };
