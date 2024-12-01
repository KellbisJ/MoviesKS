import React, { createContext, useContext, useState } from 'react';

const MenuContext = createContext();

const MenuProvider = ({ children }) => {
	const [showMenuComponents, setShowMenuComponents] = useState(true);
	const [mediaType, setMediaType] = useState(null);
	const [selectedGenre, setSelectedGenre] = useState(null);
	const [genreSelected, setGenreSelected] = useState('Genres');

	return (
		<MenuContext.Provider
			value={{
				showMenuComponents,
				setShowMenuComponents,
				mediaType,
				setMediaType,
				selectedGenre,
				setSelectedGenre,
				genreSelected,
				setGenreSelected,
			}}>
			{children}
		</MenuContext.Provider>
	);
};

const useMenuContext = () => useContext(MenuContext);

export { MenuProvider, useMenuContext };
