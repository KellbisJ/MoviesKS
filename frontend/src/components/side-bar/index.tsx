import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '../../hooks/use-dark-mode';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { SideBarPropsInterface } from '../../types/sidebar-props-interface';

const SideBar: React.FC<SideBarPropsInterface> = ({ isMobile, isSideBarOpen, toggleSideBar }) => {
	const [isDarkMode, setIsDarkMode] = useDarkMode();
	const navigate = useNavigate();
	const handleNavigation = (route: string) => {
		navigate(route);
		toggleSideBar();
	};

	return (
		<>
			{isMobile && isSideBarOpen && (
				<div className="relative">
					<div className="fixed inset-0 bg-slate-800 bg-opacity-50 backdrop-blur-md z-[100] min-h-screen" onClick={toggleSideBar}></div>
					<div className="flex fixed bg-slate-200 dark:bg-indigo-950 top-0 left-0 w-3/6 sm:w-2/5 min-h-screen overflow-hidden transition duration-500 z-[101] text-black dark:text-gray-100">
						<ul className="flex flex-col gap-4 mt-20 px-6 text-sm no-underline list-none transition text-center">
							<div className="w-fit" onClick={() => setIsDarkMode(!isDarkMode)}>
								{isDarkMode ? <MdLightMode className="text-xl" /> : <MdDarkMode className="text-xl" />}
							</div>

							<li className="bg-blue-200 dark:bg-indigo-700 rounded p-1" onClick={() => handleNavigation('/')}>
								Home
							</li>
							<li className="bg-blue-200 dark:bg-indigo-700 rounded p-1" onClick={() => handleNavigation('/movies/all')}>
								Movies
							</li>
							<li className="bg-blue-200 dark:bg-indigo-700 rounded p-1" onClick={() => handleNavigation('/tv/all')}>
								TV
							</li>
							<li className="bg-blue-200 dark:bg-indigo-700 rounded p-1" onClick={() => handleNavigation('/favorites')}>
								Favorites
							</li>
						</ul>
					</div>
				</div>
			)}
		</>
	);
};

export { SideBar };
