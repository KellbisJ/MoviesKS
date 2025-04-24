import { Link } from 'react-router-dom';
import { MobileBottomNavBarInterface } from './types';
import { Globe, Settings, User, House, Film, Tv, Save, Search } from 'lucide-react';
import { ThemeBtn } from '@/components/common/theme-btn';
import { TranslateBtn } from '@/components/common/translate-btn';
import { LanguagesSideBar } from '@/components/common/languages-sidebar';
import { useEffect, useState } from 'react';
import { isSpanishLang } from '@/utils/is-spanish-lang';
import { useLanguages } from '@/context/lang';

const MobileBottomNavBar: React.FC<MobileBottomNavBarInterface> = ({
	showNavigationPathsBottomMenu,
	setShowNavigationPathsBottomMenu,
	showSettingsBottomMenu,
	setShowSettingsBottomMenu,
	showLangSidebar,
	setShowLangSideBar,
}) => {
	const { language } = useLanguages();

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

	return (
		<nav className="fixed bottom-0 h-12 w-full bg-[#222831] backdrop-blur-sm shadow-md z-[1000] sm:hidden">
			{/* Navbar accessibility menu */}
			<div className="flex justify-around w-full h-full items-center text-gray-300">
				<Globe
					size={21}
					onClick={() => {
						setShowNavigationPathsBottomMenu((prev) => !prev);
						setShowSettingsBottomMenu(false);
						setShowLangSideBar(false);
					}}
					aria-label="navigation"
				/>
				<Settings
					size={21}
					onClick={() => {
						setShowSettingsBottomMenu((prev) => !prev);
						setShowNavigationPathsBottomMenu(false);
					}}
					aria-label="settings"
				/>
			</div>

			{/* Navigation Menu Overlay */}
			<div
				className={`fixed bottom-12 left-0 right-0 h-12 bg-[#222831] transition-all duration-300 ease-out ${
					showNavigationPathsBottomMenu
						? 'translate-y-0 opacity-100'
						: 'translate-y-full opacity-0 pointer-events-none'
				}`}>
				<div className="flex gap-3 w-full h-full items-center justify-center px-2">
					{[
						{ to: '/', label: labels.home, icon: House },
						{ to: '/movie', label: labels.movies, icon: Film },
						{ to: '/tv', label: labels.tv, icon: Tv },
						{ to: '/saved-media', label: labels.saved, icon: Save },
						{ to: '/search', label: labels.search, icon: Search },
					].map((item) => (
						<Link
							key={item.to}
							to={item.to}
							className="flex flex-col items-center gap-1 text-gray-300 hover:text-cyan-500 text-xs transition-colors duration-200"
							aria-label={item.label}>
							<item.icon size={18} className="flex-shrink-0" />
							<span>{item.label}</span>
						</Link>
					))}
				</div>
			</div>

			{/* Settings Menu Overlay */}
			<div
				className={`fixed bottom-12 left-0 right-0 h-12 bg-[#222831] transition-all duration-300 ease-out ${
					showSettingsBottomMenu
						? 'translate-y-0 opacity-100'
						: 'translate-y-full opacity-0 pointer-events-none'
				}`}>
				<div className="flex justify-between items-center h-full px-8">
					<ThemeBtn />
					<div className="relative">
						<TranslateBtn
							showLangSidebar={showLangSidebar}
							setShowLangSideBar={setShowLangSideBar}
						/>
						<div
							className={`absolute bottom-80 -right-4 rounded-lg shadow-lg transition-all duration-200 ease-out ${
								showLangSidebar ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
							}`}>
							<LanguagesSideBar />
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export { MobileBottomNavBar };
