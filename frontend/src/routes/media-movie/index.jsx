import React, { useEffect, useState } from 'react';
import { getPreviewTrendingMovies } from '../../services/preview-trending-movies';
import { getMediaByCategory } from '../../services/media-by-category';
import { CreateMedia } from '../../components/create-media';
import { useFavoriteMedia } from '../../context/favorite-media-context';
import { useMenuContext } from '../../context/menu-context';
import { useLocation } from 'react-router-dom';
import { MediaSkeleton } from '../../components/loading-skeletons';

function MediaMovie() {
	const { favorites, saveFavoriteMedia } = useFavoriteMedia();
	const { setMediaType, setSelectedGenre, mediaType, selectedGenre } = useMenuContext();
	const [loadingComponents, setLoadingComponents] = useState(true);
	const [mediaTv, setMediaTv] = useState([]);
	const favoriteTV = favorites.tv;
	const location = useLocation();

	// console.log(mediaType);

	useEffect(() => {
		const storedMediaType = localStorage.getItem('selectedMediaType');
		setMediaType(storedMediaType || 'movies');

		if (location.search.includes('genre=')) {
			const genreId = new URLSearchParams(location.search).get('genre');
			setSelectedGenre({ id: genreId, genreName: '' });
		}

		async function fetchMedia() {
			setLoadingComponents(true);
			if (selectedGenre) {
				const filteredMedia = await getMediaByCategory(mediaType, selectedGenre.id);
				setMediaTv(filteredMedia);
			} else {
				const previewTV = await getPreviewTrendingMovies();
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
				<CreateMedia media={mediaTv} type={'movies'} favorites={favoriteTV} handleFavoriteClick={handleFavoriteClick} />
			)}
		</>
	);
}

export { MediaMovie };
