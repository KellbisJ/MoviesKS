import React, { createContext, useContext, useState } from 'react';

const MenuContext = createContext();

const MenuProvider = ({ children }) => {
	const [showMenuComponents, setShowMenuComponents] = useState(true);

	return <MenuContext.Provider value={{ showMenuComponents, setShowMenuComponents }}>{children}</MenuContext.Provider>;
};

const useMenuContext = () => useContext(MenuContext);

export { MenuProvider, useMenuContext };
