import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useValidMediaType } from '@/hooks/use-valid-media-type';
import { getMediaDetail } from '../../services/media-detail';
import { MovieDetailInterface, TVDetailInterface } from '@/services/media-detail/types';
import { GenreInterface } from '../../types/genre-interface';
import { MediaDetailRender } from '../../components/specific/media-detail-render';
import { PopcornParticlesLoader } from '@/components/utilities/loaders-animation';

const MediaDetail = (): React.JSX.Element => {
	const { id } = useParams();

	const mediaType = useValidMediaType();
	const mediaId = id || '';

	const [loadingComponents, setLoadingComponents] = useState(true);

	const [mediaDetail, setMediaDetail] = useState<MovieDetailInterface | TVDetailInterface>(
		{} as MovieDetailInterface
	);
	const [similarGenres, setSimilarGenres] = useState<GenreInterface[]>([]);

	useEffect(() => {
		setLoadingComponents(true);
		window.scrollTo(0, 0);

		async function fetchMediaDetail() {
			try {
				const mediaData = await getMediaDetail(mediaType, mediaId);

				setMediaDetail(mediaData);

				if (mediaData && mediaData.genres) {
					setSimilarGenres(mediaData.genres);
				}
			} catch (error) {
				console.error(error);
			} finally {
				setLoadingComponents(false);
			}
		}

		fetchMediaDetail();
	}, [mediaType, id]);

	const isMovie = (
		media: MovieDetailInterface | TVDetailInterface
	): media is MovieDetailInterface => {
		return (
			(media as MovieDetailInterface).title !== undefined ||
			(media as MovieDetailInterface).original_title !== undefined
		);
	};

	return (
		<>
			{loadingComponents ? (
				<>
					<PopcornParticlesLoader />
				</>
			) : (
				<MediaDetailRender
					mediaDetail={mediaDetail}
					similarGenres={similarGenres}
					mediaId={mediaId}
					isMovie={isMovie}
					mediaType={mediaType}
				/>
			)}
		</>
	);
};

export { MediaDetail };
