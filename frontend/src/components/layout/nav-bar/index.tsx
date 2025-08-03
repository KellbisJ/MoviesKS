import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSearch } from '../../../context/search-media-context';
import { useDarkMode } from '../../../hooks/use-dark-mode';
import { NavBarPropsInterface } from './types';
import {
	House,
	Film,
	Tv,
	Save,
	Sun,
	Moon,
	PanelLeftOpen,
	PanelLeftClose,
	Search,
	TextSearch,
	CircleX,
	Languages,
} from 'lucide-react';
import { MediaTypeT } from '@/types/media-type';

import { LanguagesSideBar } from '@/components/common/languages-sidebar';
import { MobileBottomNavBar } from '../mobile-bottom-navbar';
import { handleSearch2 } from '@/utils/handle-search';
import { Scroll0 } from '@/utils/scroll-0';
import { TranslateBtn } from '@/components/common/translate-btn';
import { ThemeBtn } from '@/components/common/theme-btn';
import { underlinePath } from '@/utils/underline-path';
import { isSpanishLang } from '@/utils/is-spanish-lang';
import { useLanguages } from '@/context/lang';

const NavBar: React.FC<NavBarPropsInterface> = ({
	isMobile,
	toggleSideBar,
	isSideBarOpen,
	setIsSideBarOpen,
	setIsMoviesModalOpen,
	setIsGenresModalOpen,
	showLangSidebar,
	setShowLangSideBar,
}) => {
	const { language } = useLanguages();
	const { searchQuery, updateSearchQuery, updateMediaType, mediaType } = useSearch();

	const location = useLocation();
	const navigate = useNavigate();

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
		updateMediaType(location.pathname.includes('/tv') ? MediaTypeT.tv : MediaTypeT.movie);
	}, [location, updateMediaType]); // updating mediatype to search

	useEffect(() => {
		Scroll0();
	}, []);

	const navItems = [
		{ to: '/home', base: '/home', label: labels.home, icon: House },
		{
			to: location.pathname.startsWith('/movie') ? '/movie/all' : '/movie',
			base: '/movie',
			label: labels.movies,
			icon: Film,
		},
		{
			to: location.pathname.startsWith('/tv') ? '/tv/all' : '/tv',
			base: '/tv',
			label: labels.tv,
			icon: Tv,
		},
		{
			to: '/saved-media',
			base: '/saved-media',
			label: labels.saved,
			icon: Save,
		},
	];

	return (
		<>
			<nav className="hidden lg:flex justify-between items-center fixed top-0 w-full px-8 bg-white/80 dark:bg-[#1e1a2fe7] backdrop-blur-sm z-[1000] shadow-md h-16 text-gray-700 dark:text-stone-100 transition">
				<div className="flex items-center gap-6 xl:gap-8 flex-1">
					<Link to="/" className="text-2xl font-bold">
						<span className="flex items-center gap-2">
							<Film size={24} />
							MoviesKS
						</span>
					</Link>

					<div className="flex items-center gap-4 xl:gap-6">
						{navItems.map((item) => (
							<Link
								key={item.to}
								to={item.to}
								className={`flex items-center gap-2 hover:text-[#16C47F] transition-colors duration-200 text-sm ${
									underlinePath(item.base, location)
										? 'text-[#16C47F]'
										: 'text-gray-600 dark:text-gray-300 hover:text-[#16C47F] dark:hover:text-[#16C47F]'
								}`}>
								<item.icon size={18} className="flex-shrink-0" />
								{item.label}
							</Link>
						))}
					</div>
				</div>

				<div className="flex items-center gap-4 xl:gap-6 flex-1 justify-end">
					<form
						onSubmit={(e) => handleSearch2(e, searchQuery, mediaType, navigate)}
						className="relative flex items-center w-4/5 max-w-xl bg-gray-100 dark:bg-gray-700 rounded-full transition-all focus-within:ring-2 focus-within:ring-[#16C47F]">
						<input
							type="text"
							placeholder={`Search ${mediaType === MediaTypeT.movie ? 'Movies' : 'TV Series'}`}
							className="w-full px-6 py-2 bg-transparent outline-none rounded-full placeholder-gray-500 dark:placeholder-gray-400 text-sm transition-all"
							value={searchQuery}
							onChange={(e) => updateSearchQuery(e.target.value)}
							name="2ndNavbarInputSearchMedia"
						/>
						<button
							type="submit"
							className="p-2 mr-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
							<Search size={20} className="text-gray-600 dark:text-gray-300" />
						</button>
					</form>

					<TranslateBtn showLangSidebar={showLangSidebar} setShowLangSideBar={setShowLangSideBar} />

					<ThemeBtn />

					<div
						className={`absolute top-6 right-8 rounded-lg shadow-lg transition-all duration-200 ease-out ${
							showLangSidebar ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
						}`}>
						{<LanguagesSideBar />}
					</div>
				</div>
			</nav>
			<MobileBottomNavBar />
		</>
	);
};

export { NavBar };
