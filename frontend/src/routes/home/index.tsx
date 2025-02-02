import React, { useEffect, useState } from 'react';
import { getPreviewTrendingMovies } from '../../services/preview-trending-movies';
import { CreateMedia } from '../../components/create-media';
import { MediaSkeleton } from '../../components/loading-skeletons';

const Home = (): React.JSX.Element => {
	const [loadingComponents, setLoadingComponents] = useState<boolean>(true);
	const [media, setMedia] = useState([]);

	useEffect(() => {
		async function fetchMedia() {
			const previewMovies = await getPreviewTrendingMovies();
			setMedia(previewMovies);

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
