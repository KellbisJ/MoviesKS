import React, { useEffect, useState } from 'react';
import { CreateMedia } from '../../components/create-media';
import { useSavedMedia } from '../../context/favorite-media-context';
import { MediaSavedVoid } from '../../components/loading-skeletons';
import { PopcornParticlesLoader } from '../../components/loaders-animation';
import { MediaTypeT } from '@/types/media-type';

const SavedMedia = (): React.JSX.Element => {
	const [loadingComponents, setLoadingComponents] = useState<boolean>(true);

	useEffect(() => {
		window.scrollTo(0, 0);
		const timeoutId = setTimeout(() => {
			setLoadingComponents(false);
		}, 300);
		return () => clearTimeout(timeoutId);
	}, []);

	const { savedMedia } = useSavedMedia();
	const favoriteMovies = savedMedia.movies;
	const favoriteTVShows = savedMedia.tv;
	// console.log(favoriteMovies);
	// console.log(favoriteTVShows);

	const hasMovies = savedMedia.movies.length > 0;
	const hasShows = savedMedia.tv.length > 0;

	return (
		<>
			{loadingComponents ? (
				<PopcornParticlesLoader />
			) : (
				<>
					<div className="max-w-[1536px] mx-auto">
						<h1 className="text-center text-2xl sm:text-3xl font-bold dark:text-gray-100 mb-12">My Saved Media</h1>

						<section aria-labelledby="movies-section" className="mb-12">
							<h2 id="movies-section" className="text-2xl font-semibold dark:text-gray-100 mb-8">
								Movies
							</h2>
							{hasMovies ? <CreateMedia media={savedMedia.movies} type={MediaTypeT.movie} /> : <MediaSavedVoid />}
						</section>

						<section aria-labelledby="tv-section">
							<h2 id="tv-section" className="text-2xl font-semibold dark:text-gray-100 mb-8">
								TV Shows
							</h2>
							{hasShows ? <CreateMedia media={savedMedia.tv} type={MediaTypeT.tv} /> : <MediaSavedVoid />}
						</section>
					</div>
				</>
			)}
		</>
	);
};

export { SavedMedia };
