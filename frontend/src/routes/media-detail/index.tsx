import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useValidMediaType } from '@/hooks/use-valid-media-type';
import { getMediaDetail } from '../../services/media-detail';
import { getSimilarMediaDetail } from '../../services/similar-media-detail';
import { getMediaVideos } from '../../services/media-videos';
import { MovieDetailInterface, TVDetailInterface } from '@/services/media-detail/types';
import { GenreInterface } from '../../types/genre-interface';
import { MovieInterface, TVInterface } from '../../types/movie-and-tv-interface';
import { MediaVideosInterface, MediaVideosResultInterface } from '@/services/media-videos/types';
// import { getMediaImages } from '../../services/media-images';
import { MediaImagesInterface } from '@/services/media-images/types';
import { MediaDetailRender } from '../../components/media-detail-render';
import { PopcornParticlesLoader } from '@/components/loaders-animation';
import { UseHandleSaveMedia } from '@/hooks/use-handle-save-media';

const MediaDetail = (): React.JSX.Element => {
	const { id } = useParams();

	const mediaType = useValidMediaType();
	const mediaId = id || '';

	const handleSaveMedia = UseHandleSaveMedia();

	const [loadingComponents, setLoadingComponents] = useState(true);

	const [mediaDetail, setMediaDetail] = useState<MovieDetailInterface | TVDetailInterface>({} as MovieDetailInterface);

	const [mediaDetailVideos, setMediaDetailVideos] = useState<MediaVideosResultInterface[]>([]);
	const [similarGenres, setSimilarGenres] = useState<GenreInterface[]>([]);
	const [similarMedia, setSimilarMedia] = useState<MovieInterface[] | TVInterface[]>([]);
	const [mediaImages, setMediaImages] = useState<MediaImagesInterface>({} as MediaImagesInterface);

	const [showTrailer, setShowTrailer] = useState<boolean>(false);
	const [videoKey, setVideoKey] = useState<string>();

	useEffect(() => {
		setLoadingComponents(true);
		window.scrollTo(0, 0);

		async function fetchMediaDetail() {
			try {
				const [mediaData, similarMediaData, mediaVideosData] = await Promise.all([
					getMediaDetail(mediaType, mediaId),
					getSimilarMediaDetail(mediaType, mediaId),
					getMediaVideos(mediaType, mediaId),
				]);

				// const mediaImagesData = await getMediaImages(mediaType, mediaId);

				// console.log('mediaImagesData:', mediaImagesData);

				setMediaDetail(mediaData);

				if (mediaData && mediaData.genres) {
					// media detail data
					setSimilarGenres(mediaData.genres);
				}
				if (similarMediaData) {
					setSimilarMedia(similarMediaData);
				}

				if (mediaVideosData && mediaVideosData.results.length > 0) {
					// media videos data
					const video = mediaVideosData.results.find(
						(video: any) => video.type === 'Trailer' || video.type === 'Teaser' || (video.type === 'Clip' && video.site === 'YouTube')
					);
					if (video) {
						setVideoKey(video.key);
					}
					setMediaDetailVideos(mediaVideosData.results);
				} else {
					setMediaDetailVideos([]);
				}

				// if (mediaImagesData) {
				// 	// media images data
				// 	setMediaImages(mediaImagesData);
				// }
			} catch (error) {
				console.error(error);
			} finally {
				setLoadingComponents(false);
			}
		}

		// setTimeout(() => {
		//    fetchMediaDetail();
		// }, 200000)

		fetchMediaDetail();
	}, [mediaType, id]);

	// console.log(mediaDetail);

	const isMovie = (media: MovieDetailInterface | TVDetailInterface): media is MovieDetailInterface => {
		return (media as MovieDetailInterface).title !== undefined || (media as MovieDetailInterface).original_title !== undefined;
	};

	//   const isTV = (media: MovieInterface | TVInterface): media is TVInterface => {
	//   return (media as TVInterface).name !== undefined || (media as TVInterface).original_name !== undefined;
	// };

	return (
		<>
			{loadingComponents ? (
				<>
					<PopcornParticlesLoader />
				</>
			) : (
				<MediaDetailRender
					mediaDetail={mediaDetail}
					mediaDetailVideos={mediaDetailVideos}
					mediaImages={mediaImages}
					similarGenres={similarGenres}
					similarMedia={similarMedia}
					isMovie={isMovie}
					handleSaveMedia={handleSaveMedia}
					showTrailer={showTrailer}
					setShowTrailer={setShowTrailer}
					videoKey={videoKey}
					mediaType={mediaType}
				/>
			)}
		</>
	);
};

export { MediaDetail };
