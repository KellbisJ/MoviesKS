import React, { useState, useEffect } from 'react';
import { NavBar } from '../nav-bar/index.jsx';
import { FilterBar } from '../filter-bar/index.jsx';
import { SideBar } from '../side-bar/index.jsx';
import { useWindowSize } from '../../hooks/use-window-size';
import { useCategories } from '../../hooks/use-categories';
import { useMenuContext } from '../../context/menu-context';

function Menu() {
	const { isMobile } = useWindowSize();
	const { categories, isMoviesModalOpen, isGenresModalOpen, toggleMoviesModal, toggleGenresModal, componentsLoading } = useCategories();
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
						toggleSideBar={toggleSideBar}
						componentsLoading={componentsLoading}
					/>
				</>
			)}
		</>
	);
}
export { Menu };
