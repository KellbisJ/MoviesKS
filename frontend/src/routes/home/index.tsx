import React, { useEffect, useState } from 'react';
import { getPreviewTrendingMedia } from '../../services/preview-trending-media';
import { CreateMedia } from '../../components/create-media';
import { MediaSkeleton } from '../../components/loading-skeletons';
import { MovieInterface } from '../../types/movie-and-tv-interface';

const Home = (): React.JSX.Element => {
	const [loadingComponents, setLoadingComponents] = useState<boolean>(true);
	const [media, setMedia] = useState<MovieInterface[]>([]);

	useEffect(() => {
		async function fetchMedia() {
      const previewMovies = await getPreviewTrendingMedia('movies'); // I stablished trendring preview from movies as default in home path but I think that maybe trending all or popular or top rated could be better.
      const moviesData = previewMovies.results
			setMedia(moviesData as MovieInterface[]);

			setLoadingComponents(false);
		}

		fetchMedia();
	}, []);

	// console.log(media);


	return (
		<>
			{loadingComponents ? (
				<MediaSkeleton />
			) : (
				<CreateMedia media={media} type="movies"  />
			)}
		</>
	);
}

export { Home };
