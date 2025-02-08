import React, { useEffect, useState } from 'react';
import { getPreviewTrendingMedia } from '../../services/preview-trending-media';
import { getMediaByCategory } from '../../services/media-by-category';
import { CreateMedia } from '../../components/create-media';
import { useFavoriteMedia } from '../../context/favorite-media-context';
import { useMenuContext } from '../../context/menu-context';
import { useLocation } from 'react-router-dom';
import { MediaSkeleton } from '../../components/loading-skeletons';
import { MovieInterface } from '../../types/movie-and-tv-interface';

const MediaMovie = ():React.JSX.Element => {
	const { favorites } = useFavoriteMedia();
  const { setMediaType, setSelectedGenre, mediaType, selectedGenre } = useMenuContext();
  
  const [loadingComponents, setLoadingComponents] = useState(true);
  
	const [mediaMovie, setMediaMovie] = useState<MovieInterface[]>([]);

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
				const filteredMedia = await getMediaByCategory(mediaType, selectedGenre);
				setMediaMovie(filteredMedia as MovieInterface[]);
			} else {
        const previewMovie = await getPreviewTrendingMedia('movies');
        const movieData = previewMovie.results
				setMediaMovie(movieData as MovieInterface[]);
			}
			setLoadingComponents(false);
		}
		fetchMedia();
	}, [selectedGenre, setMediaType, setSelectedGenre, location]);

	return (
		<>
			{loadingComponents ? (
				<MediaSkeleton />
			) : (
				<CreateMedia media={mediaMovie} type={'movies'} />
			)}
		</>
	);
}

export { MediaMovie };
