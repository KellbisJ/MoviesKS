import React, { useEffect, useState } from 'react';
import { getPreviewTrendingMovies } from '../../services/preview-trending-movies';
import { CreateMedia } from '../../components/create-media';
import { useFavoriteMedia } from '../../context/favorite-media-context';
import { useMenuContext } from '../../context/menu-context';
import { getMediaByCategory } from '../../services/media-by-category';
import { MediaSkeleton } from '../../components/loading-skeletons';

function Home() {
	const { favorites, saveFavoriteMedia } = useFavoriteMedia();
	const [loadingComponents, setLoadingComponents] = useState(true);

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

	const handleFavoriteClick = (item) => {
		const type = item.media_type;
		saveFavoriteMedia(item, type);
	};

	return (
		<>
			{loadingComponents ? (
				<MediaSkeleton />
			) : (
				<CreateMedia media={media} type="movies" favorites={favorites.movies} handleFavoriteClick={handleFavoriteClick} />
			)}
		</>
	);
}

export { Home };
