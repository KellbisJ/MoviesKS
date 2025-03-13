import React, { useState, useEffect } from 'react';
import { NavBar } from '../nav-bar/index.tsx';
import { FilterBar } from '../filter-bar/index.tsx';
import { SideBar } from '../side-bar/index.tsx';
import { useWindowSize } from '@/hooks/use-window-size/index.tsx';
import { useCategories } from '@/hooks/use-categories/index.tsx';
import { useLocation, useParams } from 'react-router-dom';

const Menu = (): React.JSX.Element => {
	const { isMobile } = useWindowSize();
	const { type, id } = useParams();
	const { categories, isMoviesModalOpen, isGenresModalOpen, toggleMoviesModal, toggleGenresModal, componentsLoading } = useCategories();
	const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);
	const [showFilterBar, setShowFilterBar] = useState<boolean>(false);

	const location = useLocation();

	useEffect(() => {
		const showFilterbarPaths: string[] = ['/movies', '/tv', `/${type}/preview/genre/${id}`];
		showFilterbarPaths.includes(location.pathname) ? setShowFilterBar(true) : setShowFilterBar(false);
	}, [type, id, location]); // That's all, is not needed a context to show a simple component

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
			{showFilterBar && (
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
};
export { Menu };
