import React from 'react';
import { CreateMedia } from '../components/CreateMedia';
import { useFavoriteMedia } from '../context/FavoriteMediaContext';

function MediaFavorites() {
	const { favorites, saveFavoriteMedia } = useFavoriteMedia();
	const favoriteMovies = favorites.movies;
	const favoriteTVShows = favorites.tv;

	const handleFavoriteClick = (item) => {
		const type = item.media_type;

		saveFavoriteMedia(item, type);
	};

	return (
		<section className="mediaFavoritesContainer">
			<h1>My Favorites</h1>
			<div className="favoritesMovies">
				<h2>Movies</h2>
				<div className="favoritesMoviesGrid">
					<CreateMedia media={favoriteMovies} type="movies" handleFavoriteClick={(movie) => handleFavoriteClick(movie)} />
				</div>
			</div>
			<div className="favoritesTVShows">
				<h2>TV Shows</h2>
				<div className="favoritesTVShowsGrid">
					<CreateMedia media={favoriteTVShows} type="tv" handleFavoriteClick={(tvShow) => handleFavoriteClick(tvShow)} />
				</div>
			</div>
		</section>
	);
}

export { MediaFavorites };
