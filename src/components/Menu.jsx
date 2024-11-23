import React, { useState, useEffect } from 'react';
import '../styles/menu.css';
import '../services/icons.js';
import { NavBar } from './NavBar.jsx';
import { FilterBar } from './FilterBar.jsx';
import { SideBar } from './SideBar.jsx';
import { useWindowSize } from '../hooks/useWindowSize.js';
import { useCategories } from '../hooks/useCategories.js';
import { useMenuContext } from '../context/MenuContext.jsx';

function Menu() {
	const { isMobile } = useWindowSize();
	const { categories, isMoviesModalOpen, isGenresModalOpen, toggleMoviesModal, toggleGenresModal } = useCategories();
	const [isSideBarOpen, setIsSideBarOpen] = useState(false);
	const { showMenuComponents } = useMenuContext();

	useEffect(() => {
		if (!isMobile) {
			setIsSideBarOpen(false);
		}
	}, [isMobile]);

	const toggleSideBar = () => setIsSideBarOpen(!isSideBarOpen);

	return (
		<>
			<NavBar isMobile={isMobile} toggleSideBar={toggleSideBar} isSideBarOpen={isSideBarOpen} />
			<SideBar isMobile={isMobile} isSideBarOpen={isSideBarOpen} toggleSideBar={toggleSideBar} />
			{showMenuComponents && (
				<>
					<FilterBar
						isMobile={isMobile}
						isMoviesModalOpen={isMoviesModalOpen}
						isGenresModalOpen={isGenresModalOpen}
						toggleMoviesModal={toggleMoviesModal}
						toggleGenresModal={toggleGenresModal}
						categories={categories}
					/>

					<div className="AllMoviesText">
						<p>1000+ movies to discover and enjoy. Only pick up information and discover, no downloads or streaming links.</p>
					</div>
				</>
			)}
		</>
	);
}
export { Menu };
