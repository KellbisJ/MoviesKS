import React, { useEffect, useState } from 'react';
import { CreateMovies } from '../components/CreateMovies';
import '../styles/moviesContainers.css';
import { useFavoriteMovies } from '../context/FavoriteMoviesContext';

function MoviesFavorites() {
	const { favoritesMovies, saveFavoriteMovie } = useFavoriteMovies();
	console.log(favoritesMovies);

	useEffect(() => {}, []);

	const handleFavoriteClick = (movie) => {
		saveFavoriteMovie(movie);
	};

	return (
		<section className="moviesFavoritesContainer">
			<h1>My Favorites Movies</h1>
			<div className="moviesFavorites">
				<CreateMovies movies={favoritesMovies} handleFavoriteClick={handleFavoriteClick} />
			</div>
		</section>
	);
}

export { MoviesFavorites };
