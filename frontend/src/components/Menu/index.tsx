import React, { useState, useEffect } from 'react';
import { NavBar } from '../nav-bar/index.jsx';
import { FilterBar } from '../filter-bar/index.js';
import { SideBar } from '../side-bar/index.jsx';
import { useWindowSize } from '../../hooks/use-window-size/index.jsx';
import { useCategories } from '../../hooks/use-categories/index.jsx';
import { useMenuContext } from '../../context/menu-context/index.jsx';

const Menu = (): React.JSX.Element => {
	const { isMobile } = useWindowSize();
	const { categories, isMoviesModalOpen, isGenresModalOpen, toggleMoviesModal, toggleGenresModal, componentsLoading } = useCategories();
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);
  
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
						componentsLoading={componentsLoading}
					/>
				</>
			)}
		</>
	);
}
export { Menu };
