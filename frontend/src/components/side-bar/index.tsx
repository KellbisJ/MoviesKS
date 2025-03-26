import React from 'react';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../../hooks/use-dark-mode';
import { House, Film, Tv, Save, Sun, Moon } from 'lucide-react';
import { SideBarPropsInterface } from './types';
import { MediaTypeT } from '@/types/media-type';

const SideBar: React.FC<SideBarPropsInterface> = ({ isMobile, isSideBarOpen, toggleSideBar }) => {
	const [isDarkMode, setIsDarkMode] = useDarkMode();

	return (
		<>
			{isMobile && isSideBarOpen && (
				<div className="relative">
					<div className="fixed inset-0 bg-slate-800 bg-opacity-50 backdrop-blur-md z-[100] min-h-screen" onClick={toggleSideBar}></div>
					<div className="flex fixed bg-white/80 dark:bg-[#1E1A2F] top-0 left-0 w-3/6 sm:w-2/5 min-h-screen overflow-hidden transition duration-500 z-[101] text-black dark:text-gray-100">
						<ul className="flex flex-col items-start w-full max-w-xs gap-2 mt-20 px-4 text-base">
							<li className="w-full">
								<button
									type="button"
									className="flex items-center w-full gap-3 px-4 py-3 rounded-lg transition-all 
                       duration-200 hover:bg-gray-100 dark:hover:bg-gray-700
                       text-gray-700 hover:text-cyan-500 
                       dark:text-gray-300 dark:hover:text-cyan-400
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
									aria-label="Toggle theme"
									onClick={() => setIsDarkMode(!isDarkMode)}>
									{isDarkMode ? <Sun size={22} className="flex-shrink-0" /> : <Moon size={22} className="flex-shrink-0" />}
									<span className="text-sm font-medium text-start">Modo {isDarkMode ? 'Claro' : 'Oscuro'}</span>
								</button>
							</li>

							{[
								{ to: '/', label: 'Inicio', icon: House, aria: 'Inicio', toggle: toggleSideBar },
								{ to: `/${MediaTypeT.movie}/all`, label: 'Películas', icon: Film, aria: 'Películas', toggle: toggleSideBar },
								{ to: `/${MediaTypeT.tv}/all`, label: 'Series de TV', icon: Tv, aria: 'Series de TV', toggle: toggleSideBar },
								{ to: '/saved-media', label: 'Guardado', icon: Save, aria: 'Guardado', toggle: toggleSideBar },
							].map(({ to, label, icon: Icon, aria, toggle }) => (
								<li key={to} className="w-full">
									<Link
										to={to}
										className="flex items-center w-full gap-3 px-4 py-3 rounded-lg transition-all 
                           duration-200 hover:bg-gray-100 dark:hover:bg-gray-800
                           text-gray-700 hover:text-cyan-500 
                           dark:text-gray-300 dark:hover:text-cyan-400
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500
                           [&.active]:text-cyan-500 [&.active]:dark:text-cyan-400"
										aria-label={aria}
										onClick={toggle}>
										<Icon size={22} className="flex-shrink-0" />
										<span className="text-sm font-medium">{label}</span>
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			)}
		</>
	);
};

export { SideBar };
