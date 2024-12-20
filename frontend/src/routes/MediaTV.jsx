import React, { useEffect, useState } from 'react';
import { getPreviewTrendingTV } from '../services/PreviewTrendingTv';
import { getMediaByCategory } from '../services/MediaByCategory';
import { CreateMedia } from '../components/CreateMedia';
import { useFavoriteMedia } from '../context/FavoriteMediaContext';
import { useMenuContext } from '../context/MenuContext';
import { useLocation } from 'react-router-dom';
import { MediaSkeleton } from '../components/LoadingSkeletons';

function MediaTV() {
	const { favorites, saveFavoriteMedia } = useFavoriteMedia();
	const { setMediaType, setSelectedGenre, mediaType, selectedGenre } = useMenuContext();
	const [loadingComponents, setLoadingComponents] = useState(true);
	const [mediaTv, setMediaTv] = useState([]);
	const favoriteTV = favorites.tv;
	const location = useLocation();

	// console.log(mediaType);

	useEffect(() => {
		const storedMediaType = localStorage.getItem('selectedMediaType');
		setMediaType(storedMediaType || 'tv');

		if (location.search.includes('genre=')) {
			const genreId = new URLSearchParams(location.search).get('genre');
			setSelectedGenre({ id: genreId, genreName: '' });
		}

		async function fetchMedia() {
			if (selectedGenre) {
				const filteredMedia = await getMediaByCategory(mediaType, selectedGenre.id);
				setMediaTv(filteredMedia);
			} else {
				const previewTV = await getPreviewTrendingTV();
				setMediaTv(previewTV);
			}
			setLoadingComponents(false);
		}
		fetchMedia();
	}, [selectedGenre, setMediaType, setSelectedGenre, location]);

	const handleFavoriteClick = (item) => {
		const type = item.media_type;
		saveFavoriteMedia(item, type);
	};

	return (
		<>
			{loadingComponents ? (
				<MediaSkeleton />
			) : (
				<section className="gridMediaContainer">
					<CreateMedia media={mediaTv} type={'tv'} favorites={favoriteTV} handleFavoriteClick={handleFavoriteClick} />
				</section>
			)}
		</>
	);
}

export { MediaTV };
