import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';
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
				<nav className="navBar">
					<ul className="navList">
						<li className="navItem">
							<button className="navItemSideBarButton" onClick={toggleSideBar}>
								<FontAwesomeIcon icon={isSideBarOpen ? 'times' : 'bars'} />
							</button>
						</li>
						<li className="navItem">
							<Link className="navLink" to="/">
								MoviesKS
							</Link>
						</li>

						{showSearchBar ? (
							<li className="navItemSearchBarOverlay">
								<button className="navItemSeachButtonWide" onClick={handleCloseSearchBar}>
									<FontAwesomeIcon icon="times" />
								</button>
								<input
									className="navItemSearchInputOverlay"
									placeholder={`Search ${mediaType === 'movies' ? 'Movies' : 'TV Series'}`}
									value={searchQuery}
									onChange={(e) => updateSearchQuery(e.target.value)}
								/>
								<button className="navItemSearchButtonOverlay" onClick={handleSearchIconClick}>
									<FontAwesomeIcon icon="search" />
								</button>
							</li>
						) : (
							<li className="navItem">
								<button className="navItemSearchButton" onClick={handleSearchIconClick}>
									<FontAwesomeIcon icon="search" />
								</button>
							</li>
						)}
					</ul>
				</nav>
			) : (
				<nav className="navBarWide">
					<ul className="navListWide">
						<li className="navItemWide">
							<Link className="navLink" to="/">
								MoviesKS
							</Link>
						</li>
						<li className="navItemWide" onClick={() => handleNavigation('/')}>
							Home
						</li>
						<li className="navItemWide" onClick={() => handleNavigation('/movies/all')}>
							Movies
						</li>
						<li className="navItemWide" onClick={() => handleNavigation('/favorites')}>
							Favorites
						</li>
						<li className="navItemWide" onClick={() => handleNavigation('/tv/all')}>
							TV
						</li>
					</ul>
					<ul className="navListWideSearch">
						<li className="navItemWideSearch">
							<input
								className="navItemSearchInput"
								placeholder={`Search ${mediaType === 'movies' ? 'Movies' : 'TV Series'}`}
								value={searchQuery}
								onChange={(e) => updateSearchQuery(e.target.value)}></input>
							<button className="navItemSearchButtonWide" onClick={handleSearch}>
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
