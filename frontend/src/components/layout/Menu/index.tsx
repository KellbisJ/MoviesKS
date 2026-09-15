import React, { useState, useEffect } from 'react';
import { NavBar } from '../nav-bar/index.tsx';
import { useWindowSize } from '@/hooks/use-window-size/index.tsx';

const Menu = (): React.JSX.Element => {
	const { isMobile } = useWindowSize();
	const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);
	const [showLangSidebar, setShowLangSideBar] = useState<boolean>(false);

	useEffect(() => {
		if (!isMobile) {
			setIsSideBarOpen(false);
		}
	}, [isMobile]);

	const toggleSideBar = () => setIsSideBarOpen(!isSideBarOpen);

	return (
		<NavBar
			isMobile={isMobile}
			toggleSideBar={toggleSideBar}
			isSideBarOpen={isSideBarOpen}
			setIsSideBarOpen={setIsSideBarOpen}
			showLangSidebar={showLangSidebar}
			setShowLangSideBar={setShowLangSideBar}
		/>
	);
};
export { Menu };
