import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../context/SearchMediaContext';

function NavBar({ isMobile, toggleSideBar, isSideBarOpen }) {
	const { searchQuery, updateSearchQuery, updateMediaType, mediaType } = useSearch();
	const location = useLocation();
	const navigate = useNavigate();
	const [showSearchBar, setShowSearchBar] = useState(false);

	useEffect(() => {
		if (location.pathname.includes('/tv')) {
			updateMediaType('tv');
		} else {
			updateMediaType('movies');
		}
	}, [location, updateMediaType]);

	const handleNavigation = (route) => {
		navigate(route);
	};

	const handleSearch = () => {
		const sanitizedQuery = searchQuery.replace(/[^a-zA-Z0-9\s]/g, '').trim();
		if (sanitizedQuery !== '') {
			navigate(`/search/${mediaType}/${sanitizedQuery}`);
		}
	};

	const handleSearchIconClick = () => {
		if (showSearchBar) {
			handleSearch();
		} else {
			setShowSearchBar(true);
		}
	};

	const handleCloseSearchBar = () => {
		setShowSearchBar(false);
	};

	return (
		<>
			{isMobile ? (
				<nav className="top-0 w-full bg-fuchsia-700 shadow-md z-20 fixed px-6 text-stone-100">
					<ul className="flex list-none justify-between items-center py-4 m-0">
						<li className="text-lg font-semibold decoration no-underline text-center rounded transition list-none">
							<button className="navItemSideBarButton" onClick={toggleSideBar}>
								<FontAwesomeIcon icon={isSideBarOpen ? 'times' : 'bars'} />
							</button>
						</li>
						<li className="text-lg font-semibold decoration no-underline text-center rounded transition list-none">
							<Link className="font-bold text-lg no-underlin" to="/home">
								MoviesKS
							</Link>
						</li>

						{showSearchBar ? (
							<li className="absolute top-0 left-0 w-full flex items-center justify-center bg-fuchsia-800 p-3 pl-6 pr-6 shadow-md z-20">
								<button
									className="bg-fuchsia-950 border-none p-0 min-w-[30px] max-w-[40px] min-h-[30px] max-h-[40px] rounded-full text-[18px]"
									onClick={handleCloseSearchBar}>
									<FontAwesomeIcon icon="times" />
								</button>
								<input
									className="flex-1 p-2 pl-4 pr-4 m-0 mx-4 border-none rounded-2xl text-base shadow-inner bg-fuchsia-950 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:bg-fuchsia-800"
									placeholder={`Search ${mediaType === 'movies' ? 'Movies' : 'TV Series'}`}
									value={searchQuery}
									onChange={(e) => updateSearchQuery(e.target.value)}
								/>
								<button
									className="flex items-center justify-center border-none bg-none cursor-pointer text-[18px] text-white"
									onClick={handleSearchIconClick}>
									<FontAwesomeIcon icon="search" />
								</button>
							</li>
						) : (
							<li className="text-lg font-semibold decoration no-underline text-center rounded transition list-none">
								<button
									className="bg-none border-none p-0 flex items-center justify-center w-auto h-auto cursor-pointer"
									onClick={handleSearchIconClick}>
									<FontAwesomeIcon icon="search" />
								</button>
							</li>
						)}
					</ul>
				</nav>
			) : (
				<nav className="hidden md:flex justify-between items-center fixed top-0 w-full px-8 bg-fuchsia-700 z-1000 shadow-md h-16 text-stone-100">
					<ul className="flex items-center list-none justify-between m-0 w-1/2">
						<li className="text-[16px] font-semibold no-underline text-center transition-colors duration-300 cursor-pointer">
							<Link className="no-underline text-[20px] font-bold" to="/home">
								MoviesKS
							</Link>
						</li>
						<li className="cursor-pointer" onClick={() => handleNavigation('/')}>
							Home
						</li>
						<li className="cursor-pointer" onClick={() => handleNavigation('/movies/all')}>
							Movies
						</li>
						<li className="cursor-pointer" onClick={() => handleNavigation('/favorites')}>
							Favorites
						</li>
						<li className="cursor-pointer" onClick={() => handleNavigation('/tv/all')}>
							TV
						</li>
					</ul>
					<ul className="flex items-center list-none justify-between p-0">
						<li className="flex items-center font-semibold no-underline text-center transition-colors duration-300 list-none bg-fuchsia-900  border-none rounded-2xl outline-none w-[45vw] min-w-[150px] max-w-[650px] focus-within:outline-none focus-within:ring-2 focus-within:ring-fuchsia-500 focus-within:bg-fuchsia-800">
							<input
								className="flex-grow rounded-2xl outline-none p-2 pl-4 text-stone-100 text-[16px] transition duration-300 shadow ease-in-out"
								placeholder={`Search ${mediaType === 'movies' ? 'Movies' : 'TV Series'}`}
								value={searchQuery}
								onChange={(e) => updateSearchQuery(e.target.value)}
							/>
							<button
								className="bg-none border-none p-2 flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2"
								onClick={handleSearch}>
								<FontAwesomeIcon icon="search" />
							</button>
						</li>
					</ul>
				</nav>
			)}
		</>
	);
}

export { NavBar };
