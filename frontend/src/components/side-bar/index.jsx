import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '../../hooks/use-dark-mode';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

function SideBar({ isMobile, isSideBarOpen, toggleSideBar }) {
	const [isDarkMode, toggleDarkMode] = useDarkMode();
	const navigate = useNavigate();
	const handleNavigation = (route) => {
		navigate(route);
		toggleSideBar();
	};

	return (
		<>
			{isMobile && isSideBarOpen && (
				<div className="relative">
					<div className="fixed inset-0 bg-slate-900 bg-opacity-50 backdrop-blur-md z-40" onClick={toggleSideBar}></div>
					<div className="flex fixed bg-slate-200 dark:bg-indigo-950 top-0 left-0 w-3/6 sm:w-2/5 min-h-screen overflow-x-hidden transition duration-500 z-50 text-black dark:text-gray-100">
						<ul className="flex flex-col gap-4 mt-20 px-6 text-lg no-underline list-none transition">
							<div className="w-fit" onClick={toggleDarkMode}>
								{isDarkMode ? <MdLightMode className="text-xl" /> : <MdDarkMode className="text-xl" />}
							</div>

							<li onClick={() => handleNavigation('/')}>Home</li>
							<li onClick={() => handleNavigation('/movies/all')}>Movies</li>
							<li onClick={() => handleNavigation('/tv/all')}>TV</li>
							<li onClick={() => handleNavigation('/favorites')}>Favorites</li>
						</ul>
					</div>
				</div>
			)}
		</>
	);
}

export { SideBar };
