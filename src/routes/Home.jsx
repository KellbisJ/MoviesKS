import React, { useEffect, useState } from 'react';
import { getPreviewTrendingMovies } from '../services/PreviewTrendingMovies';
import { CreateMedia } from '../components/CreateMedia';
import { useFavoriteMedia } from '../context/FavoriteMediaContext';
import { useMenuContext } from '../context/MenuContext';
import { getMediaByCategory } from '../services/MediaByCategory';
import { MediaSkeleton } from '../components/LoadingSkeletons';

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
				<section className="trendingPreviewMediaContainer">
					<CreateMedia media={media} type="movies" favorites={favorites.movies} handleFavoriteClick={handleFavoriteClick} />
				</section>
			)}
		</>
	);
}

export { Home };
