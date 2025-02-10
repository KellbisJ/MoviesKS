import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMediaDetail } from '../../services/media-detail';
import { getSimilarMediaDetail } from '../../services/similar-media-detail';
import { getMediaVideos } from '../../services/media-videos';
import { MediaDetailSkeleton } from '../../components/loading-skeletons';
import { useFavoriteMedia } from '../../context/favorite-media-context';
import { MovieDetailInterface, TVDetailInterface } from '../../types/media-detail-interface';
import { GenreInterface } from '../../types/genre-interface';
import { MovieInterface, TVInterface } from '../../types/movie-and-tv-interface';
import { MediaVideosInterface, MediaVideosResultInterface } from '../../types/media-videos-interface';
import { getMediaImages } from '../../services/media-images';
import { MediaImagesInterface } from '../../types/media-images-interface';
import { MediaDetailRender } from '../../components/media-detail-render';

const MediaDetail = (): React.JSX.Element => {
  const { type, id } = useParams();
  
  const mediaType = type as string;
  const mediaId = id as string;

  const { saveFavoriteMedia } = useFavoriteMedia();

  const [loadingComponents, setLoadingComponents] = useState(true);
  
  const [mediaDetail, setMediaDetail] = useState<MovieDetailInterface | TVDetailInterface>({} as MovieDetailInterface);
  
	const [mediaDetailVideos, setMediaDetailVideos] = useState<MediaVideosResultInterface[]>([]);
	const [similarGenres, setSimilarGenres] = useState<GenreInterface[]>([]);
  const [similarMedia, setSimilarMedia] = useState<MovieInterface[] | TVInterface[]>([]);
  const [mediaImages, setMediaImages] = useState<MediaImagesInterface>({} as MediaImagesInterface);
  
	const [showTrailer, setShowTrailer] = useState<boolean>(false);
  const [videoKey, setVideoKey] = useState<string>();

	useEffect(() => {
		if (mediaType && mediaId) {
	
			setLoadingComponents(true);
			window.scrollTo(0, 0);

			async function fetchMediaDetail() {
				const mediaData = await getMediaDetail(mediaType, mediaId);
				const similarMediaData = await getSimilarMediaDetail(mediaType, mediaId) 
        const mediaVideosData = await getMediaVideos(mediaType, mediaId) as MediaVideosInterface;
        const mediaImagesData = await getMediaImages(mediaType, mediaId)

        // console.log('mediaImagesData:', mediaImagesData);

				if (mediaData && mediaData.genres) { // media detail data
					setSimilarGenres(mediaData.genres);
				}
				if (similarMediaData) {
					setSimilarMedia(similarMediaData);
				}

				setMediaDetail(mediaData);

				if (mediaVideosData && mediaVideosData.results.length > 0) { // media videos data
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
        
        if (mediaImagesData) { // media images data
          setMediaImages(mediaImagesData)
        }

				setLoadingComponents(false);
      }
      
      // setTimeout(() => {
      //    fetchMediaDetail();
      // }, 200000)

      fetchMediaDetail();
      
		}
  }, [id, type]);

	const handleFavoriteClick = () => {
		if (!['movies', 'tv'].includes(mediaType)) {
			console.error(`Invalid media type: ${type}`);
			return;
    }
    
    const MEDIA_TYPE = type as 'movies' | 'tv'

    if (mediaDetail) {
      saveFavoriteMedia!(MEDIA_TYPE, mediaDetail);
    }
		
  };
  
  const isMovie = (media: MovieDetailInterface | TVDetailInterface): media is MovieDetailInterface => {
  return (media as MovieDetailInterface).title !== undefined || (media as MovieDetailInterface).original_title !== undefined;
};

//   const isTV = (media: MovieInterface | TVInterface): media is TVInterface => {
//   return (media as TVInterface).name !== undefined || (media as TVInterface).original_name !== undefined;
// };

	return (
		<>
			{loadingComponents ? (
				<MediaDetailSkeleton />
			) : (
          <MediaDetailRender mediaDetail={mediaDetail} mediaDetailVideos={mediaDetailVideos} mediaImages={mediaImages} similarGenres={similarGenres} similarMedia={similarMedia} isMovie={isMovie} handleFavoriteClick={handleFavoriteClick} showTrailer={ showTrailer} setShowTrailer={setShowTrailer} videoKey={videoKey} mediaType={mediaType} />
			)}
		</>
	);
}

export { MediaDetail };
