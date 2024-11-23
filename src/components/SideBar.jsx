import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/menu.css';

function SideBar({ isMobile, isSideBarOpen, toggleSideBar }) {
	const navigate = useNavigate();
	const handleNavigation = (route) => {
		navigate(route);
		toggleSideBar();
	};

	return (
		<>
			{isMobile && isSideBarOpen && (
				<div className="navSideBar">
					<ul className="navSideBarList">
						<li className="navItem navItemSideBar" onClick={() => handleNavigation('/')}>
							Home
						</li>
						<li className="navItem navItemSideBar" onClick={() => handleNavigation('/movies/all')}>
							Movies
						</li>
						<li className="navItem navItemSideBar" onClick={() => handleNavigation('/series')}>
							Series
						</li>
						<li className="navItem navItemSideBar" onClick={() => handleNavigation('/genres')}>
							Genres
						</li>
						<li className="navItem navItemSideBar" onClick={() => handleNavigation('/favorites')}>
							Favorites
						</li>
					</ul>
				</div>
			)}
		</>
	);
}

export { SideBar };