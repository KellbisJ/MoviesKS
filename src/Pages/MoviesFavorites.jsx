import React, { useEffect, useState } from 'react';
import { CreateMovies } from '../components/CreateMovies';
import '../styles/moviesContainers.css';
import { saveMovie, removeMovie } from '../services/saveMovie';

function MoviesFavorites() {
	const [movies, setMovies] = useState([]);

	const fetchFavoriteMovies = () => {
		const storedMovies = localStorage.getItem('favoriteMovies');
		const favoriteMovies = storedMovies ? JSON.parse(storedMovies) : [];
		setMovies(favoriteMovies);
	};

	useEffect(() => {
		fetchFavoriteMovies();

		window.addEventListener('storage', fetchFavoriteMovies);
		return () => {
			window.removeEventListener('storage', fetchFavoriteMovies);
		};
	}, []);

	const handleFavoriteClick = (movie) => {
		const isFavorite = saveMovie(movie);
		let updatedMovies;
		if (!isFavorite) {
			updatedMovies = movies.filter((m) => m.id !== movie.id);
		} else {
			updatedMovies = [...movies, movie];
		}
		setMovies(updatedMovies);
	};

	return (
		<section className="moviesFavoritesContainer">
			<h1>My Favorites Movies</h1>
			<div className="moviesFavorites">
				<CreateMovies movies={movies} handleFavoriteClick={handleFavoriteClick} />
			</div>
		</section>
	);
}

export { MoviesFavorites };
