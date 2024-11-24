import React, { useEffect, useState, useCallback } from 'react';
import { getPreviewTrendingMovies } from '../services/PreviewTrendingMovies';
import { CreateMedia } from '../components/CreateMedia';
import { useFavoriteMedia } from '../context/FavoriteMediaContext';

function Home() {
	const { favorites, saveFavoriteMedia } = useFavoriteMedia();
	const [media, setMedia] = useState([]);
	const favoriteMedia = favorites.movies;

	useEffect(() => {
		async function fetchMedia() {
			const previewMovies = await getPreviewTrendingMovies();
			// console.log(previewMovies);

			setMedia(previewMovies);
		}
		fetchMedia();
	}, []);

	const handleFavoriteClick = (item) => {
		const type = item.media_type;

		saveFavoriteMedia(item, type);
	};

	return (
		<>
			<section className="trendingPreviewMediaContainer">
				<CreateMedia media={media} type="movies" favorites={favoriteMedia} handleFavoriteClick={handleFavoriteClick} />
			</section>
		</>
	);
}

export { Home };
