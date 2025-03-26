import React, { useEffect, useState } from 'react';
import { CreateMedia } from '../../components/create-media';
import { useSavedMedia } from '../../context/favorite-media-context';
import { MediaFavoritesVoid } from '../../components/loading-skeletons';
import { PopcornParticlesLoader } from '../../components/loaders-animation';
import { MediaTypeT } from '@/types/media-type';

const SavedMedia = (): React.JSX.Element => {
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		window.scrollTo(0, 0);
		const timeoutId = setTimeout(() => {
			setLoading(false);
		}, 300);
		return () => clearTimeout(timeoutId);
	}, []);

	const { savedMedia } = useSavedMedia();
	const favoriteMovies = savedMedia.movies;
	const favoriteTVShows = savedMedia.tv;
	// console.log(favoriteMovies);
	// console.log(favoriteTVShows);

	return (
		<>
			{loading ? (
				<PopcornParticlesLoader />
			) : (
				<>
					<h2 className="text-center dark:text-gray-100">My Saved Media</h2>
					<h3 className="dark:text-gray-100 my-8">Movies</h3>
					{favoriteMovies.length > 0 ? <CreateMedia media={favoriteMovies} type={MediaTypeT.movie} /> : <MediaFavoritesVoid />}

					<h3 className="dark:text-gray-100 my-8">TV Shows</h3>
					{favoriteTVShows.length > 0 ? <CreateMedia media={favoriteTVShows} type={MediaTypeT.tv} /> : <MediaFavoritesVoid />}
				</>
			)}
		</>
	);
};

export { SavedMedia };
