import React, { useEffect, useState, useCallback } from 'react';
import { getPreviewTrendingMovies } from '../services/PreviewTrendingMovies';
import { CreateMedia } from '../components/CreateMedia';
import { useFavoriteMedia } from '../context/FavoriteMediaContext';

function Home() {
	const { favorites, saveFavoriteMedia } = useFavoriteMedia();
	const [media, setMedia] = useState([]);
	const favoriteMovies = favorites.movies;

	useEffect(() => {
		async function fetchMovies() {
			const previewMovies = await getPreviewTrendingMovies();
			// console.log(previewMovies);

			setMedia(previewMovies);
		}
		fetchMovies();
	}, []);

	const handleFavoriteClick = (item) => {
		const type = item.media_type;

		saveFavoriteMedia(item, type);
	};

	return (
		<>
			<section className="trendingPreviewMediaContainer">
				<CreateMedia media={media} type="movies" favorites={favoriteMovies} handleFavoriteClick={handleFavoriteClick} />
			</section>
		</>
	);
}

export { Home };
