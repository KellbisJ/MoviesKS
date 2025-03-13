import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../context/search-media-context';
import { useDarkMode } from '../../hooks/use-dark-mode';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { VscThreeBars } from 'react-icons/vsc';
import { FaTimes } from 'react-icons/fa';
import { CgSearch } from 'react-icons/cg';
import { NavBarPropsInterface } from '../../types/navbar-props-interface';

const NavBar: React.FC<NavBarPropsInterface> = ({ isMobile, toggleSideBar, isSideBarOpen }) => {
	const { searchQuery, updateSearchQuery, updateMediaType, mediaType } = useSearch();
	const location = useLocation();
	const navigate = useNavigate();
	const [showSearchBar, setShowSearchBar] = useState(false);
	const [isDarkMode, setIsDarkMode] = useDarkMode();

	useEffect(() => {
		if (location.pathname.includes('/tv')) {
			updateMediaType('tv');
		} else {
			updateMediaType('movies');
		}
	}, [location, updateMediaType]); // updating mediatype to search

	const handleNavigation = (route: string) => {
		navigate(route);
	};

	const handleSearch = () => {
		const sanitizedQuery = searchQuery.replace(/[^a-zA-Z0-9\s]/g, '').trim(); // rg expression to search media query only by safe characters
		if (sanitizedQuery !== '') {
			navigate(`/search/${mediaType}/${sanitizedQuery}`); // isn't allowed an empty search query
		}
	};

	const handleSearchIconClick = () => {
		if (showSearchBar) {
			handleSearch();
		} else {
			setShowSearchBar(true); // this when is mobile
		}
	};

	const handleCloseSearchBar = () => {
		setShowSearchBar(false); // this when is mobile also
	};

	return (
		<>
			{isMobile ? (
				<nav className="top-0 w-full bg-fuchsia-700 dark:bg-slate-900/80 backdrop-blur-sm shadow-md z-[1000] fixed px-6 text-stone-100 transition">
					<ul className="flex list-none justify-between items-center py-4 m-0">
						<li className="text-lg font-semibold decoration no-underline text-center rounded transition list-none">
							<button className="navItemSideBarButton" onClick={toggleSideBar}>
								{isSideBarOpen ? <FaTimes /> : <VscThreeBars />}
							</button>
						</li>
						<li className="text-lg font-semibold decoration no-underline text-center rounded transition list-none">
							<Link className="font-bold text-lg no-underlin" to="/home">
								MoviesKS
							</Link>
						</li>

						{showSearchBar ? (
							<li className="absolute top-0 left-0 w-full flex items-center justify-center bg-fuchsia-800 dark:bg-slate-950 p-3 pl-6 pr-6 shadow-md z-20">
								<button
									className="flex items-center justify-center bg-fuchsia-950 dark:bg-gray-700 border-none p-0 min-w-[30px] max-w-[40px] min-h-[30px] max-h-[40px] rounded-full"
									onClick={handleCloseSearchBar}>
									<FaTimes />
								</button>
								<input
									className="flex-1 p-2 pl-4 pr-4 m-0 mx-4 border-none rounded-2xl text-base shadow-inner bg-fuchsia-950 dark:bg-gray-700 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-fuchsia-500 dark:focus:ring-indigo-950"
									placeholder={`Search ${mediaType === 'movies' ? 'Movies' : 'TV Series'}`}
									value={searchQuery}
									onChange={(e) => updateSearchQuery(e.target.value)}
								/>
								<button
									className="flex items-center justify-center border-none bg-none cursor-pointer text-xl text-white"
									onClick={handleSearchIconClick}>
									<CgSearch />
								</button>
							</li>
						) : (
							<li className="text-lg font-semibold decoration no-underline text-center rounded transition list-none">
								<button
									className="bg-none border-none p-0 flex items-center justify-center w-auto h-auto cursor-pointer"
									onClick={handleSearchIconClick}>
									<CgSearch />
								</button>
							</li>
						)}
					</ul>
				</nav>
			) : (
				<nav className="hidden md:flex justify-between items-center fixed top-0 w-full px-8 bg-fuchsia-700 dark:bg-slate-900/80 backdrop-blur-sm z-[1000] shadow-md h-16 text-stone-100 transition">
					<ul className="flex items-center list-none justify-between m-0 w-1/2">
						<li className="text-[16px] font-semibold no-underline text-center transition-colors duration-300 cursor-pointer">
							<Link className="no-underline text-[20px] font-bold" to="/">
								MoviesKS
							</Link>
						</li>
						<div className="w-fit" onClick={() => setIsDarkMode(!isDarkMode)}>
							{isDarkMode ? <MdLightMode className="text-xl cursor-pointer" /> : <MdDarkMode className="text-xl cursor-pointer" />}
						</div>
						<li className="cursor-pointer" onClick={() => handleNavigation('/home')}>
							Home
						</li>
						<li className="cursor-pointer" onClick={() => handleNavigation('/movies/all')}>
							Movies
						</li>
						<li className="cursor-pointer" onClick={() => handleNavigation('/tv/all')}>
							TV
						</li>
						<li className="cursor-pointer" onClick={() => handleNavigation('/favorites')}>
							Favorites
						</li>
					</ul>
					<ul className="flex items-center list-none justify-between p-0">
						<li className="flex items-center font-semibold no-underline text-center duration-300 list-none bg-fuchsia-900 dark:bg-gray-700 border-none rounded-2xl outline-none w-[45vw] min-w-[150px] max-w-[650px] focus-within:outline-none focus-within:ring-2 focus-within:ring-fuchsia-500 dark:focus-within:ring-indigo-950 transition">
							<input
								className="flex-grow rounded-2xl outline-none p-2 pl-4 text-stone-100 text-[16px] transition duration-300 ease-in-out bg-fuchsia-900 dark:bg-gray-700"
								placeholder={`Search ${mediaType === 'movies' ? 'Movies' : 'TV Series'}`}
								value={searchQuery}
								onChange={(e) => updateSearchQuery(e.target.value)}
							/>
							<button className="bg-none border-none p-2 flex items-center justify-center cursor-pointer" onClick={handleSearch}>
								<CgSearch />
							</button>
						</li>
					</ul>
				</nav>
			)}
		</>
	);
};

export { NavBar };
