import React, { createContext, useContext, useState, useEffect } from 'react';
import { saveMovie } from '../services/saveMovie';

const FavoriteMoviesContext = createContext();

const FavoriteMoviesProvider = ({ children }) => {
	const [favoritesMovies, setFavoritesMovies] = useState([]);

	useEffect(() => {
		const storedMovies = localStorage.getItem('favoriteMovies');
		const favorites = storedMovies ? JSON.parse(storedMovies) : [];
		setFavoritesMovies(favorites);
	}, []);

	const saveFavoriteMovie = (movie) => {
		const isFavorite = saveMovie(movie);
		let updatedFavorites;
		if (!isFavorite) {
			updatedFavorites = favoritesMovies.filter((m) => m.id !== movie.id);
		} else {
			updatedFavorites = [...favoritesMovies, movie];
		}
		setFavoritesMovies(updatedFavorites);
		localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
	};

	return <FavoriteMoviesContext.Provider value={{ favoritesMovies, saveFavoriteMovie }}>{children}</FavoriteMoviesContext.Provider>;
};

const useFavoriteMovies = () => useContext(FavoriteMoviesContext);

export { FavoriteMoviesProvider, useFavoriteMovies };
