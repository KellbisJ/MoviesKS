import React, { useEffect, useState, useCallback } from 'react';
import { getPreviewTrendingMovies } from '../services/PreviewTrendingMovies';
import { CreateMovies } from '../components/CreateMovies';
import { saveMovie } from '../services/saveMovie';

function Home() {
	const [movies, setMovies] = useState([]);
	const [favoritesMovies, setFavoritesMovies] = useState([]);

	useEffect(() => {
		async function fetchMovies() {
			const previewMovies = await getPreviewTrendingMovies();
			setMovies(previewMovies);
		}
		fetchMovies();
	}, []);

	useEffect(() => {
		const storedMovies = localStorage.getItem('favoriteMovies');
		const favorites = storedMovies ? JSON.parse(storedMovies) : [];
		setFavoritesMovies(favorites);
	}, []);

	const handleFavoriteClick = (movie) => {
		const isFavorite = saveMovie(movie);
		let updatedFavorites;
		if (!isFavorite) {
			updatedFavorites = favoritesMovies.filter((m) => m.id !== movie.id);
		} else {
			updatedFavorites = [...favoritesMovies, movies];
		}
		setFavoritesMovies(updatedFavorites);
	};

	return (
		<>
			<section className="trendingPreviewMovies">
				<CreateMovies movies={movies} favoritesMovies={favoritesMovies} handleFavoriteClick={handleFavoriteClick} />
			</section>
		</>
	);
}

export { Home };
