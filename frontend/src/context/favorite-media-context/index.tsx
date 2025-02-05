import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSaveMedia } from '../../hooks/use-save-media';
import { MovieInterface, TVInterface } from '../../types/movie-and-tv-interface';
import { FavoriteMediaContextType } from '../../types/favorite-media-context-interface';

const initialContextValue: FavoriteMediaContextType = {
  favorites: {
    movies: [],
    tv: [],
  },
  // mediaType: undefined,
  saveFavoriteMedia: () => {}
}

const FavoriteMediaContext = createContext<FavoriteMediaContextType>(initialContextValue);

const FavoriteMediaProvider = ({ children }: {children: React.ReactNode}) => {
  const [favorites, setFavorites] = useState < FavoriteMediaContextType['favorites']>(initialContextValue.favorites);

	useEffect(() => {
		const storedFavorites = localStorage.getItem('favoriteMedia');
		const favorites = storedFavorites ? JSON.parse(storedFavorites) : { movies: [], tv: [] };
		setFavorites(favorites);
	}, []);

	const saveFavoriteMedia = (mediaType: 'movies' | 'tv', media: (MovieInterface | TVInterface)) => {
		if (!mediaType) {
			console.error(`invalid media type: ${mediaType}`);
			return;
		}

		const isFavorite = useSaveMedia(media,mediaType );
		let updatedFavorites;
		if (!isFavorite) {
			updatedFavorites = {
				...favorites,
				[mediaType]: favorites[mediaType].filter((item) => item.id !== media.id),
			};
		} else {
			updatedFavorites = {
				...favorites,
				[mediaType]: [...favorites[mediaType], media],
			};
		}
		setFavorites(updatedFavorites);
		localStorage.setItem('favoriteMedia', JSON.stringify(updatedFavorites));
	};

	return <FavoriteMediaContext.Provider value={{ favorites, saveFavoriteMedia }}>{children}</FavoriteMediaContext.Provider>;
};

const useFavoriteMedia = () => useContext(FavoriteMediaContext);

export { FavoriteMediaProvider, useFavoriteMedia };
