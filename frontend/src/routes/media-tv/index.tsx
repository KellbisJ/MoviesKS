import React, { useEffect, useState } from 'react';
import { getPreviewTrendingMedia } from '../../services/preview-trending-media';
import { getMediaByCategory } from '../../services/media-by-category';
import { CreateMedia } from '../../components/create-media';
import { useMenuContext } from '../../context/menu-context';
import { useLocation } from 'react-router-dom';
import { MediaSkeleton } from '../../components/loading-skeletons';
import { TVInterface } from '../../types/movie-and-tv-interface';

const MediaTV = (): React.JSX.Element => {
  const { setMediaType, setSelectedGenre, mediaType, selectedGenre } = useMenuContext();
  
	const [loadingComponents, setLoadingComponents] = useState<boolean>(true);
  const [mediaTv, setMediaTv] = useState<TVInterface[]>([]);
  
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
        const filteredMedia = await getMediaByCategory(mediaType, selectedGenre);
				setMediaTv(filteredMedia as TVInterface[]);
			} else {
        const previewTV = await getPreviewTrendingMedia(mediaType);
        const tvData = previewTV.results
				setMediaTv(tvData as TVInterface[]);
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
				<CreateMedia media={mediaTv} type={'tv'} />
			)}
		</>
	);
}

export { MediaTV };
