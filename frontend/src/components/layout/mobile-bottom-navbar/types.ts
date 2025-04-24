interface MobileBottomNavBarInterface {
	showNavigationPathsBottomMenu: boolean;
	setShowNavigationPathsBottomMenu: React.Dispatch<React.SetStateAction<boolean>>;
	showSettingsBottomMenu: boolean;
	setShowSettingsBottomMenu: React.Dispatch<React.SetStateAction<boolean>>;
	showLangSidebar: boolean;
	setShowLangSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}

export { MobileBottomNavBarInterface };
