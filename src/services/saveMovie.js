import React from 'react';

const saveMovie = (movie) => {
	const storedMovies = localStorage.getItem('favoriteMovies');
	let favoriteMovies = storedMovies ? JSON.parse(storedMovies) : [];
	const isFavorite = favoriteMovies.some((favMovie) => favMovie.id === movie.id);

	if (!isFavorite) {
		favoriteMovies.push(movie);
		localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
		return true;
	} else {
		favoriteMovies = favoriteMovies.filter((favMovie) => favMovie.id !== movie.id);
		localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
		return false;
	}
};

export { saveMovie };
