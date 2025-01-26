import React from 'react';
import { useNavigate } from 'react-router-dom';

function SideBar({ isMobile, isSideBarOpen, toggleSideBar }) {
	const navigate = useNavigate();
	const handleNavigation = (route) => {
		navigate(route);
		toggleSideBar();
	};

	return (
		<>
			{isMobile && isSideBarOpen && (
				<div className="flex fixed bg-[#151b23] top-0 left-0 w-full h-screen overflow-x-hidden transition duration-500 z-50 justify-between">
					<ul className="mt-20">
						<li
							className="text-lg font-semibold decoration no-underline rounded transition list-none cursor-pointer p-0 m-3 text-justify"
							onClick={() => handleNavigation('/')}>
							Home
						</li>
						<li
							className="text-lg font-semibold decoration no-underline rounded transition list-none cursor-pointer p-0 m-3 text-justify"
							onClick={() => handleNavigation('/movies/all')}>
							Movies
						</li>
						<li
							className="text-lg font-semibold decoration no-underline rounded transition list-none cursor-pointer p-0 m-3 text-justify"
							onClick={() => handleNavigation('/tv/all')}>
							TV
						</li>
						<li
							className="text-lg font-semibold decoration no-underline rounded transition list-none cursor-pointer p-0 m-3 text-justify"
							onClick={() => handleNavigation('/favorites')}>
							Favorites
						</li>
					</ul>
				</div>
			)}
		</>
	);
}

export { SideBar };
