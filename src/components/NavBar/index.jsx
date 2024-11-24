import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import './NavBar.css';
import { useNavigate } from 'react-router-dom';

function NavBar({ isMobile, toggleSideBar, isSideBarOpen }) {
	const navigate = useNavigate();
	const handleNavigation = (route) => {
		navigate(route);
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
						<li className="navItem">
							<button className="navItemSearchButton">
								<FontAwesomeIcon icon="search" />
							</button>
						</li>
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
							<input className="navItemSearchInput" placeholder="Search..."></input>
							<button className="navItemSearchButtonWide">
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
