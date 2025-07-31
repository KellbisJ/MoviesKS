import { useEffect, useState } from 'react';
import { useValidMediaType } from '@/hooks/use-valid-media-type';
import { useLocation, useParams } from 'react-router-dom';
import { getPreviewTrendingMedia } from '@/services/preview-trending-media';
import { getMediaByCategory } from '@/services/media-by-category';
import { CreateMedia } from '@/components/specific/create-media';
import { MovieInterface, TVInterface } from '@/types/movie-and-tv-interface';
import { MediaTypeT } from '@/types/media-type';
import { MediaSkeleton } from '@/components/utilities/loading-skeletons';

const FilteredMedia = () => {
	const location = useLocation();
	const { id } = useParams();

	const mediaType = useValidMediaType();
	const mediaIdGenre = id || '';

	if (mediaType !== MediaTypeT.movie && mediaType !== MediaTypeT.tv) {
		console.error('Invalid media type');
	}

	const [loadingComponents, setLoadingComponents] = useState<boolean>(true);
	const [media, setMedia] = useState<MovieInterface[] | TVInterface[]>([]);

	useEffect(() => {
		const fetchMedia = async () => {
			try {
				let mediaFilteredData: MovieInterface[] | TVInterface[];
				if (location.pathname.includes('/preview/genre/')) {
					if (!mediaIdGenre) throw new Error('Genre ID is missing');

					const mediaFiltered = await getMediaByCategory(mediaType, mediaIdGenre);
					mediaFilteredData = mediaFiltered.results;
				} else {
					const mediaFiltered = await getPreviewTrendingMedia(mediaType);
					mediaFilteredData = mediaFiltered.results;
				}
				setMedia(mediaFilteredData);
			} catch (error) {
				console.error('Error fetching media:', error);
			} finally {
				setLoadingComponents(false);
			}
		};
		fetchMedia();
	}, [location, mediaType, mediaIdGenre]);

	return (
		<>
			{media.length === 0 && loadingComponents && <MediaSkeleton />}

			<CreateMedia media={media} type={mediaType} containerType="Normal" />
		</>
	);
};

export { FilteredMedia };
