import React from 'react';
import '../styles/moviesContainers.css';

function createMovies(movies = []) {
	return movies.map((movie) => (
		<div key={movie.id} className="movieContainer">
			<img className="movieImg" alt={movie.title} src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} />
			<div className="movieInfo">
				<span className="movieFavoriteIcon">*</span>
			</div>
		</div>
	));
}

export { createMovies };
