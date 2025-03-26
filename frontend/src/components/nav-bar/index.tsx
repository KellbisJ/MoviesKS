import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSearch } from '../../context/search-media-context';
import { useDarkMode } from '../../hooks/use-dark-mode';
import { NavBarPropsInterface } from './types';
import { House, Film, Tv, Save, Sun, Moon, PanelLeftOpen, PanelLeftClose, Search, TextSearch, CircleX } from 'lucide-react';
import { MediaTypeT } from '@/types/media-type';

const NavBar: React.FC<NavBarPropsInterface> = ({
	isMobile,
	toggleSideBar,
	isSideBarOpen,
	setIsSideBarOpen,
	setIsMoviesModalOpen,
	setIsGenresModalOpen,
}) => {
	const { searchQuery, updateSearchQuery, updateMediaType, mediaType } = useSearch();
	const location = useLocation();
	const navigate = useNavigate();
	const [showSearchBar, setShowSearchBar] = useState(false);
	const [isDarkMode, setIsDarkMode] = useDarkMode();

	useEffect(() => {
		updateMediaType(location.pathname.includes('/tv') ? MediaTypeT.tv : MediaTypeT.movie);
	}, [location, updateMediaType]); // updating mediatype to search

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		setShowSearchBar(false);
		const sanitizedQuery = searchQuery.replace(/[^a-zA-Z0-9\s]/g, '').trim(); // rg expression to search media query only by safe characters
		if (sanitizedQuery !== '') {
			navigate(`/search/${mediaType}/${sanitizedQuery}`); // isn't allowed an empty search query
		}
	};

	const handleSearchIconClick = () => {
		setIsMoviesModalOpen(false);
		setIsGenresModalOpen(false);
		setIsSideBarOpen(false);
		setShowSearchBar(!showSearchBar); // this when is mobile
		// if (showSearchBar) {
		// 	handleSearch();
		// }
	};

	return (
		<>
			{isMobile ? (
				<nav className="flex top-0 w-full bg-white/80 dark:bg-[#1e1a2fe7] backdrop-blur-sm shadow-md z-[1000] fixed px-6 text-gray-700 dark:text-gray-300 transition h-14 justify-between">
					<ul className="flex list-none justify-between items-center w-full m-0">
						<li className="text-lg font-semibold decoration no-underline text-center rounded transition list-none">
							<button
								className="navItemSideBarButton"
								onClick={() => {
									toggleSideBar();
									setShowSearchBar(false);
									setIsMoviesModalOpen(false);
									setIsGenresModalOpen(false);
								}}>
								{isSideBarOpen ? <PanelLeftClose /> : <PanelLeftOpen />}
							</button>
						</li>
						<li className="text-lg font-semibold decoration no-underline text-center rounded transition list-none">
							<Link className="font-bold text-lg no-underline" to="/home">
								MoviesKS
							</Link>
						</li>
						<li className="text-lg font-semibold decoration no-underline text-center rounded transition list-none">
							<button
								className="bg-none border-none p-0 flex items-center justify-center w-auto h-auto cursor-pointer"
								onClick={handleSearchIconClick}>
								<TextSearch />
							</button>
						</li>

						{showSearchBar && !isSideBarOpen && (
							<li className="absolute top-16 left-0 w-full flex items-center justify-center bg-white/80 dark:bg-[#1e1a2fe7] p-3 px-6 shadow-md z-20">
								<button
									className="flex items-center justify-center rounded-full mr-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 transition-colors"
									onClick={handleSearchIconClick}>
									<CircleX size={20} />
								</button>

								<form onSubmit={handleSearch} className="relative flex-1 max-w-2xl">
									<input
										className="w-full p-2 pl-4 pr-10 border-none rounded-2xl text-gray-100 text-base shadow-inner bg-gray-700 transition-all duration-300 ease-in-out focus:outline-none"
										placeholder={`Search ${mediaType === MediaTypeT.movie ? 'Movies' : 'TV Series'}`}
										value={searchQuery}
										onChange={(e) => updateSearchQuery(e.target.value)}
										onKeyDown={(e) => {
											if (e.key === 'Enter') {
												handleSearch(e);
												setShowSearchBar(false);
											}
										}}
									/>

									<button
										type="submit"
										className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center size-8 border-none bg-none cursor-pointer text-white hover:text-cyan-300 transition-colors">
										<Search size={18} className="stroke-current" />
									</button>
								</form>
							</li>
						)}
					</ul>
				</nav>
			) : (
				<nav className="hidden md:flex justify-between items-center fixed top-0 w-full px-8 bg-white/80 dark:bg-[#1e1a2fe7] backdrop-blur-sm z-[1000] shadow-md h-16 text-gray-700 dark:text-stone-100 transition">
					<div className="flex items-center gap-6 xl:gap-8 flex-1">
						<Link to="/" className="text-2xl font-bold hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">
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
							onSubmit={handleSearch}
							className="relative flex items-center w-4/5 max-w-xl bg-gray-100 dark:bg-gray-700 rounded-full transition-all focus-within:ring-2 focus-within:ring-cyan-500">
							<input
								type="text"
								placeholder={`Search ${mediaType === MediaTypeT.movie ? 'Movies' : 'TV Series'}`}
								className="w-full px-6 py-2 bg-transparent outline-none rounded-full placeholder-gray-500 dark:placeholder-gray-400 text-sm transition-all"
								value={searchQuery}
								onChange={(e) => updateSearchQuery(e.target.value)}
							/>
							<button type="submit" className="p-2 mr-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
								<Search size={20} className="text-gray-600 dark:text-gray-300" />
							</button>
						</form>

						<button
							onClick={() => setIsDarkMode(!isDarkMode)}
							className="p-1.5 rounded-lg transition-colors bg-stone-100 dark:bg-gray-700 hover:bg-cyan-500 dark:hover:bg-cyan-500">
							{isDarkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-black dark:text-gray-300" />}
						</button>
					</div>
				</nav>
			)}
		</>
	);
};

export { NavBar };
