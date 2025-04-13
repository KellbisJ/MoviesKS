interface NavBarPropsInterface {
	isMobile: boolean;
	toggleSideBar: () => void;
	isSideBarOpen: boolean;
	setIsSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setIsMoviesModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setIsGenresModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export { NavBarPropsInterface };
