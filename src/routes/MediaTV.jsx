import React, { useEffect, useState, useCallback } from 'react';
import { getPreviewTrendingTV } from '../services/PreviewTrendingTv';
import { getMediaByCategory } from '../services/MediaByCategory';
import { CreateMedia } from '../components/CreateMedia';
import { useFavoriteMedia } from '../context/FavoriteMediaContext';
import { useMenuContext } from '../context/MenuContext';
import { useLocation } from 'react-router-dom';

function MediaTV() {
	const { favorites, saveFavoriteMedia } = useFavoriteMedia();
	const { mediaType, setMediaType, selectedGenre, setSelectedGenre } = useMenuContext();
	const [mediaTv, setMediaTv] = useState([]);
	const [paramsProcessed, setParamsProcessed] = useState(false);
	const favoriteTV = favorites.tv;
	const location = useLocation();

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const genre = params.get('genre');
		if (genre) {
			setSelectedGenre(genre);
		} else {
			setSelectedGenre(null);
		}
		if (location.pathname === '/tv') {
			setMediaType('tv');
		} else {
			setMediaType('movie');
		}
		setParamsProcessed(true);
	}, [location, setSelectedGenre, setMediaType]);

	useEffect(() => {
		if (!paramsProcessed) return;

		async function fetchMedia() {
			if (selectedGenre) {
				const filteredMedia = await getMediaByCategory(mediaType, selectedGenre);
				setMediaTv(filteredMedia);
			} else {
				const previewTV = await getPreviewTrendingTV();
				// console.log(previewTV);

				setMediaTv(previewTV);
			}
		}
		fetchMedia();
	}, [selectedGenre, mediaType, paramsProcessed]);

	const handleFavoriteClick = (item) => {
		const type = item.media_type;

		saveFavoriteMedia(item, type);
	};

	return (
		<>
			<section className="trendingPreviewMediaContainer">
				<CreateMedia media={mediaTv} type={mediaType === 'tv' ? 'tv' : 'movie'} favorites={favoriteTV} handleFavoriteClick={handleFavoriteClick} />
			</section>
		</>
	);
}

export { MediaTV };
