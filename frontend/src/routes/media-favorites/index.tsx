import React, { useEffect, useState } from 'react';
import { CreateMedia } from '../../components/create-media';
import { useFavoriteMedia } from '../../context/favorite-media-context';
import { useMenuContext } from '../../context/menu-context';
import { MediaFavoritesVoid } from '../../components/loading-skeletons';
import { CircleLoader } from '../../components/circle-loader';

const MediaFavorites = (): React.JSX.Element => {
  const { setShowMenuComponents } = useMenuContext();
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
		setShowMenuComponents(false);
		return () => setShowMenuComponents(true);
	}, [setShowMenuComponents]);
  
  useEffect(() => {
		const timeoutId = setTimeout(() => {
				setLoading(false);
		}, 300);
		return () => clearTimeout(timeoutId);
	}, []);

	const { favorites } = useFavoriteMedia();
	const favoriteMovies = favorites.movies;
	const favoriteTVShows = favorites.tv;
	// console.log(favoriteMovies);
	// console.log(favoriteTVShows);

	return (
    <>
      {loading ? (
      <CircleLoader/>
      ) : (
          <>
            <h1 className="text-center dark:text-gray-100">My Favorites</h1>
			      <h2 className="dark:text-gray-100 my-8">Movies</h2>
			        {favoriteMovies.length > 0 ? (
				        <CreateMedia media={favoriteMovies} type="movies" />
			        ) : (<MediaFavoritesVoid />)}

			        <h2 className="dark:text-gray-100 my-8">TV Shows</h2>
			        {favoriteTVShows.length > 0 ? (
				        <CreateMedia media={favoriteTVShows} type="tv" />
			        ) : (<MediaFavoritesVoid />)}
          </>
      )}
			
		</>
	);
}

export { MediaFavorites };
