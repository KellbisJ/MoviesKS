import React, { useEffect } from 'react';
import { CreateMedia } from '../components/create-media';
import { useFavoriteMedia } from '../context/FavoriteMediaContext';
import { useMenuContext } from '../context/MenuContext';
import { MediaFavoritesVoid } from '../components/loading-skeletons';

function MediaFavorites() {
	const { setShowMenuComponents } = useMenuContext();

	useEffect(() => {
		setShowMenuComponents(false);
		return () => setShowMenuComponents(true);
	}, [setShowMenuComponents]);

	const { favorites, saveFavoriteMedia } = useFavoriteMedia();
	const favoriteMovies = favorites.movies;
	const favoriteTVShows = favorites.tv;
	// console.log(favoriteMovies);
	// console.log(favoriteTVShows);

	const handleFavoriteClick = (item) => {
		const type = item.media_type;

		saveFavoriteMedia(item, type);
	};

	return (
		<section className="mediaFavoritesContainer">
			<h1 className="text-center">My Favorites</h1>
			<div className="favoritesMovies">
				<h2>Movies</h2>
				{favoriteMovies.length > 0 ? (
					<CreateMedia media={favoriteMovies} type="movies" handleFavoriteClick={(movie) => handleFavoriteClick(movie)} />
				) : (
					<MediaFavoritesVoid />
				)}
			</div>
			<div className="favoritesTVShows">
				<h2>TV Shows</h2>
				{favoriteTVShows.length > 0 ? (
					<CreateMedia media={favoriteTVShows} type="tv" handleFavoriteClick={(tvShow) => handleFavoriteClick(tvShow)} />
				) : (
					<MediaFavoritesVoid />
				)}
			</div>
		</section>
	);
}

export { MediaFavorites };
