import React, { useEffect, useState, useCallback } from 'react';
import { getPreviewTrendingMovies } from '../services/PreviewTrendingMovies';
import { CreateMedia } from '../components/CreateMedia';
import { useFavoriteMedia } from '../context/FavoriteMediaContext';
import { useMenuContext } from '../context/MenuContext';
import { getMediaByCategory } from '../services/MediaByCategory';
import { FilterBar } from '../components/FilterBar';
import { useLocation } from 'react-router-dom';

function Home() {
	const { favorites, saveFavoriteMedia } = useFavoriteMedia();
	const { mediaType, setMediaType, selectedGenre, setSelectedGenre } = useMenuContext();
	const [media, setMedia] = useState([]);
	const [paramsProcessed, setParamsProcessed] = useState(false);
	const favoriteMedia = favorites.movies;
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
			setMediaType('movies');
		}
		setParamsProcessed(true);
	}, [location, setSelectedGenre, setMediaType]);

	useEffect(() => {
		if (!paramsProcessed) return;

		async function fetchMedia() {
			if (selectedGenre) {
				const filteredMedia = await getMediaByCategory(mediaType, selectedGenre);
				setMedia(filteredMedia);
				// console.log(filteredMedia);
			} else {
				const previewMovies = await getPreviewTrendingMovies();
				// console.log(previewMovies);

				setMedia(previewMovies);
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
				<CreateMedia
					media={media}
					type={mediaType === 'movies' ? 'movies' : 'tv'} // aqui un condenado 2 horas depurando, type daba undefined por poner 'movie' en vez de 'movies'
					favorites={favoriteMedia}
					handleFavoriteClick={handleFavoriteClick}
				/>
			</section>
		</>
	);
}

export { Home };
