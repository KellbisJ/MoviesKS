import React from 'react';
import '../styles/moviesContainers.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFavoriteMovies } from '../context/FavoriteMoviesContext';

const CreateMovies = ({ movies = [] }) => {
	const { favoritesMovies, saveFavoriteMovie } = useFavoriteMovies();

	const handleFavoriteClick = (movie) => {
		saveFavoriteMovie(movie);
	};

	return (
		<>
			{movies.map((movie, index) => (
				<div key={`${movie.id}-${index}`} className="movieContainer">
					<img className="movieImg" alt={movie.title} src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} />
					<div className="movieInfo">
						<span
							className="movieFavoriteIcon"
							style={{ color: favoritesMovies.some((favMovie) => favMovie.id === movie.id) ? '#ffd700' : '#7e7b7b' }}
							onClick={() => handleFavoriteClick(movie)}>
							<FontAwesomeIcon icon="heart" />
						</span>
					</div>
				</div>
			))}
		</>
	);
};

export { CreateMovies };
