import React, { useEffect } from 'react';
import { CreateMedia } from '../../components/create-media';
import { useFavoriteMedia } from '../../context/favorite-media-context';
import { useMenuContext } from '../../context/menu-context';
import { MediaFavoritesVoid } from '../../components/loading-skeletons';

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
		<>
			<h1 className="text-center dark:text-gray-100">My Favorites</h1>

			<h2 className="dark:text-gray-100 my-8">Movies</h2>
			{favoriteMovies.length > 0 ? (
				<CreateMedia media={favoriteMovies} type="movies" handleFavoriteClick={(movie) => handleFavoriteClick(movie)} />
			) : (
				<MediaFavoritesVoid />
			)}

			<h2 className="dark:text-gray-100 my-8">TV Shows</h2>
			{favoriteTVShows.length > 0 ? (
				<CreateMedia media={favoriteTVShows} type="tv" handleFavoriteClick={(tvShow) => handleFavoriteClick(tvShow)} />
			) : (
				<MediaFavoritesVoid />
			)}
		</>
	);
}

export { MediaFavorites };
