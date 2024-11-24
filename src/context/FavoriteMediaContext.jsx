import React, { createContext, useContext, useState, useEffect } from 'react';
import { saveMedia } from '../services/saveMedia';

const FavoriteMediaContext = createContext();

const FavoriteMediaProvider = ({ children }) => {
	const [favorites, setFavorites] = useState({
		movies: [],
		tv: [],
	});

	useEffect(() => {
		const storedFavorites = localStorage.getItem('favoriteMedia');
		const favorites = storedFavorites ? JSON.parse(storedFavorites) : { movies: [], tv: [] };
		setFavorites(favorites);
	}, []);

	const saveFavoriteMedia = (media, type) => {
		const isFavorite = saveMedia(media, type);
		let updatedFavorites;
		if (!isFavorite) {
			updatedFavorites = {
				...favorites,
				[type]: favorites[type].filter((item) => item.id !== media.id),
			};
		} else {
			updatedFavorites = {
				...favorites,
				[type]: [...favorites[type], media],
			};
		}
		setFavorites(updatedFavorites);
		localStorage.setItem('favoriteMedia', JSON.stringify(updatedFavorites));
	};

	return <FavoriteMediaContext.Provider value={{ favorites, saveFavoriteMedia }}>{children}</FavoriteMediaContext.Provider>;
};

const useFavoriteMedia = () => useContext(FavoriteMediaContext);

export { FavoriteMediaProvider, useFavoriteMedia };
