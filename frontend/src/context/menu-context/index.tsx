import React, { createContext, useContext, useState } from 'react';
import { MenuContextInterface } from '../../types/menu-context-interface';

const MenuContext = createContext<MenuContextInterface>({
  showMenuComponents: true,
  setShowMenuComponents: () => {},
  mediaType: '',
  setMediaType: () => {},
  selectedGenre: '',
  setSelectedGenre: () => {},
  genreSelected: 'Genres',
  setGenreSelected: () => {},
});

const MenuProvider = ({ children }: {children: React.ReactNode}) => {
	const [showMenuComponents, setShowMenuComponents] = useState<boolean>(true);
	const [mediaType, setMediaType] = useState<string>('');
  const [selectedGenre, setSelectedGenre] = useState('');
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
