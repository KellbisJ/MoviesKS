import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CreateMedia } from '../../components/create-media';
import { getMediaByCategory } from '../../services/media-by-category';
import { MediaSkeleton } from '../../components/loading-skeletons';
import { MovieInterface, TVInterface } from '../../types/movie-and-tv-interface';

const MediaPreviewByGenre = (): React.JSX.Element => {
	const [loadingComponents, setLoadingComponents] = useState(true);
  const { type, id } = useParams();

  const [media, setMedia] = useState<MovieInterface[] | TVInterface[]>([]);
  const mediaType: string = type as string
  const mediaId: string = id as string

	useEffect(() => {
    setLoadingComponents(true);
    if (mediaType && mediaId) {
    async function fetchMedia() {
			if (id) {
        const filteredMedia = await getMediaByCategory(mediaType, mediaId);
        const filteredMediaData = filteredMedia.results
				setMedia(filteredMediaData);
			}
		}

		setLoadingComponents(false);
		fetchMedia();
    }
		
	}, [type, id]);

	if (media.length === 0) {
		return <MediaSkeleton />;
	}

	return (
		<>
			{loadingComponents ? (
				<MediaSkeleton />
			) : (
					<CreateMedia media={media} type={mediaType} />
			)}
		</>
	);
};

export { MediaPreviewByGenre };
