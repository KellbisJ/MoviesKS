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

import { useMenuLang } from '@/hooks/use-menu-lang';
import { LanguagesSideBar } from '@/components/common/languages-sidebar';
import { MobileBottomNavBar } from '../mobile-bottom-navbar';
import { handleSearch2 } from '@/utils/handle-search';
import { Scroll0 } from '@/utils/scroll-0';

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
	const { searchQuery, updateSearchQuery, updateMediaType, mediaType } = useSearch();
	const location = useLocation();
	const navigate = useNavigate();

	const [isDarkMode, setIsDarkMode] = useDarkMode();

	useEffect(() => {
		updateMediaType(location.pathname.includes('/tv') ? MediaTypeT.tv : MediaTypeT.movie);
	}, [location, updateMediaType]); // updating mediatype to search

	Scroll0();

	return (
		<>
			<nav className="hidden lg:flex justify-between items-center fixed top-0 w-full px-8 bg-white/80 dark:bg-[#1e1a2fe7] backdrop-blur-sm z-[1000] shadow-md h-16 text-gray-700 dark:text-stone-100 transition">
				<div className="flex items-center gap-6 xl:gap-8 flex-1">
					<Link
						to="/"
						className="text-2xl font-bold hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">
						<span className="flex items-center gap-2">
							<Film size={24} />
							MoviesKS
						</span>
					</Link>

					<div className="flex items-center gap-4 xl:gap-6">
						{[
							{ to: '/home', label: 'Inicio', icon: House },
							{ to: `/${MediaTypeT.movie}/all`, label: 'Películas', icon: Film },
							{ to: `/${MediaTypeT.tv}/all`, label: 'Series de TV', icon: Tv },
							{ to: '/saved-media', label: 'Guardado', icon: Save },
						].map((item) => (
							<Link
								key={item.to}
								to={item.to}
								className="flex items-center gap-2 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors text-sm">
								<item.icon size={18} className="flex-shrink-0" />
								{item.label}
							</Link>
						))}
					</div>
				</div>

				<div className="flex items-center gap-4 xl:gap-6 flex-1 justify-end">
					<form
						onSubmit={(e) => handleSearch2(e, searchQuery, mediaType, navigate)}
						className="relative flex items-center w-4/5 max-w-xl bg-gray-100 dark:bg-gray-700 rounded-full transition-all focus-within:ring-2 focus-within:ring-cyan-500">
						<input
							type="text"
							placeholder={`Search ${mediaType === MediaTypeT.movie ? 'Movies' : 'TV Series'}`}
							className="w-full px-6 py-2 bg-transparent outline-none rounded-full placeholder-gray-500 dark:placeholder-gray-400 text-sm transition-all"
							value={searchQuery}
							onChange={(e) => updateSearchQuery(e.target.value)}
						/>
						<button
							type="submit"
							className="p-2 mr-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
							<Search size={20} className="text-gray-600 dark:text-gray-300" />
						</button>
					</form>

					<button
						type="button"
						className="p-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-600 hover:text-cyan-500 dark:text-gray-300 hover:bg-cyan-500 dark:hover:bg-cyan-500 transition-colors duration-300"
						aria-label={'translate'}
						onClick={() => {
							setShowLangSideBar(!showLangSidebar);
						}}>
						{<Languages size={20} className="text-black dark:text-gray-300" />}
					</button>

					<button
						onClick={() => setIsDarkMode(!isDarkMode)}
						className="p-1.5 rounded-lg transition-colors bg-stone-100 dark:bg-gray-700 hover:bg-cyan-500 dark:hover:bg-cyan-500">
						{isDarkMode ? (
							<Sun size={20} className="text-yellow-400" />
						) : (
							<Moon size={20} className="text-black dark:text-gray-300" />
						)}
					</button>

					{showLangSidebar && (
						<div className="absolute">
							<LanguagesSideBar />
						</div>
					)}
				</div>
			</nav>
			<MobileBottomNavBar />
		</>
	);
};

export { NavBar };
