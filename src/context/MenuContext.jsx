import React, { createContext, useContext, useState } from 'react';

const MenuContext = createContext();

const MenuProvider = ({ children }) => {
	const [showMenuComponents, setShowMenuComponents] = useState(true);
	const [mediaType, setMediaType] = useState('movies');
	const [selectedGenre, setSelectedGenre] = useState(null);
	const [genreSelected, setGenreSelected] = useState('Genres'); // Añadir esto

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
