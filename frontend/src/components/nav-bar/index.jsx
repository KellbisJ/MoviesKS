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
				<nav className="top-0 w-full bg-[#050d18] shadow-md z-20 fixed">
					<ul className="flex list-none justify-between m-0 p-3">
						<li className="text-lg font-semibold decoration no-underline text-center rounded transition p-3 list-none">
							<button className="navItemSideBarButton" onClick={toggleSideBar}>
								<FontAwesomeIcon icon={isSideBarOpen ? 'times' : 'bars'} />
							</button>
						</li>
						<li className="text-lg font-semibold decoration no-underline text-center rounded transition p-3 list-none">
							<Link className="font-bold text-lg no-underline text-white" to="/">
								MoviesKS
							</Link>
						</li>

						{showSearchBar ? (
							<li className="absolute top-0 left-0 w-full flex justify-between items-center bg-[#050d18] p-2 shadow-md z-20">
								<button
									className="bg-[#290f41] border-none p-0 flex items-center justify-center min-w-[30px] max-w-[40px] min-h-[30px] max-h-[40px] rounded-full text-[18px]"
									onClick={handleCloseSearchBar}>
									<FontAwesomeIcon icon="times" />
								</button>
								<input
									className="flex-1 p-2 m-0 mx-4 border-none rounded-2xl text-base shadow-inner bg-[#151b23] transition-colors duration-300 ease-in-out focus:border-[#ffcc00] focus:shadow-[#ffcc00] focus:outline-none"
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
							<li className="text-lg font-semibold decoration no-underline text-center rounded transition p-3 list-none">
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
				<nav className="hidden md:flex justify-between items-center fixed top-0 w-full bg-[#050d18] z-1000 shadow-md p-4">
					<ul className="flex items-center list-none justify-between m-0 p-[2vh] w-1/2">
						<li className="text-[16px] font-semibold no-underline text-center transition-colors duration-300 cursor-pointer">
							<Link className="text-white no-underline text-[20px] font-bold" to="/">
								MoviesKS
							</Link>
						</li>
						<li onClick={() => handleNavigation('/')}>Home</li>
						<li onClick={() => handleNavigation('/movies/all')}>Movies</li>
						<li onClick={() => handleNavigation('/favorites')}>Favorites</li>
						<li onClick={() => handleNavigation('/tv/all')}>TV</li>
					</ul>
					<ul className="flex items-center list-none justify-between m-custom p-0">
						<li className="font-semibold no-underline text-center transition-colors duration-300 w-full list-none">
							<input
								className="border-none rounded-2xl outline-none w-[45vw] max-w-[650px] min-w-[150px] p-2 bg-[#151b23] text-white text-[16px] transition-colors duration-300 shadow ease-in-out focus:border-[#ffcc00] focus:shadow-[#ffcc00] focus:outline-none"
								placeholder={`Search ${mediaType === 'movies' ? 'Movies' : 'TV Series'}`}
								value={searchQuery}
								onChange={(e) => updateSearchQuery(e.target.value)}></input>
							<button
								className="bg-none border-none p-0 flex items-center justify-center absolute top-[40%] right-[4.5%] w-auto h-auto cursor-pointer"
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
