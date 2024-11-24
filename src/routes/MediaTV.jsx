import React, { useEffect, useState, useCallback } from 'react';
import { getPreviewTrendingTV } from '../services/PreviewTrendingTv';
import { CreateMedia } from '../components/CreateMedia';
import { useFavoriteMedia } from '../context/FavoriteMediaContext';

function MediaTV() {
	const { favorites, saveFavoriteMedia } = useFavoriteMedia();
	const [tv, setTv] = useState([]);
	const favoriteTV = favorites.tv;

	useEffect(() => {
		async function fetchMedia() {
			const previewTV = await getPreviewTrendingTV();
			console.log(previewTV);

			setTv(previewTV);
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
				<CreateMedia media={tv} type="tv" favorites={favoriteTV} handleFavoriteClick={handleFavoriteClick} />
			</section>
		</>
	);
}

export { MediaTV };
