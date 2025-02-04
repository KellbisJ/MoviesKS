import React, { useEffect, useState } from 'react';
import { getMediaDetail } from '../../services/media-detail';
import { getSimilarMediaDetail } from '../../services/similar-media-detail';
import { getMediaVideos } from '../../services/media-videos';
import { useMenuContext } from '../../context/menu-context';
import { CreateSimilarGenres } from '../../components/create-similar-genres';
import { CreateSimilarMediaDetail } from '../../components/create-similar-media-detail';
import { useParams } from 'react-router-dom';
import { BigPosterPathNullSkeleton, SimilarGenresNullSkeleton, MediaDetailSkeleton } from '../../components/loading-skeletons';
import { TrailerMedia } from '../../components/modals/trailer-media';
import { useFavoriteMedia } from '../../context/favorite-media-context';
import { LiaStarSolid } from 'react-icons/lia';
import { BiBookmarkHeart, BiSolidMoviePlay } from 'react-icons/bi';
// import { MovieInterface, TVInterface } from '../../types/movie-and-tv-interface';
import { MovieDetailInterface, TVDetailInterface } from '../../types/media-detail-interface';
import { GenreInterface } from '../../types/genre-interface';

const MediaDetail = (): React.JSX.Element => {
	const { setShowMenuComponents } = useMenuContext();

	useEffect(() => {
		setShowMenuComponents(false);
		return () => setShowMenuComponents(true);
	}, [setShowMenuComponents]);

  const { type, id  } = useParams();

  const { favorites, saveFavoriteMedia } = useFavoriteMedia();

  
  const [mediaType, setMediaType] = useState<string>('')
  const [mediaId, setMediaId] = useState<string>('')

	const [loadingComponents, setLoadingComponents] = useState(true);
  const [mediaDetail, setMediaDetail] = useState<MovieDetailInterface | TVDetailInterface>();
  
	const [mediaDetailVideos, setMediaDetailVideos] = useState(null);
	const [similarGenres, setSimilarGenres] = useState<GenreInterface[]>([]);
	const [similarMedia, setSimilarMedia] = useState([]);
	const [showTrailer, setShowTrailer] = useState(false);
	const [videoKey, setVideoKey] = useState(null);

	
	const favoriteMedia = favorites.movies || favorites.tv || [];
	const isFavorite = favoriteMedia.some((favMedia) => favMedia.id === mediaDetail?.id);

	useEffect(() => {
    setLoadingComponents(true);
    
    if (id) {
      
      setMediaId(id)
    }
    if (type) {
setMediaType(type)
    }
		window.scrollTo(0, 0);
		async function fetchMediaDetail() {
			const mediaData = await getMediaDetail(mediaId, mediaType);
			const similarMediaData = await getSimilarMediaDetail(mediaId, mediaType);
			const mediaVideosData = await getMediaVideos(id, type);

			// console.log(mediaData);
			// console.log(mediaVideosData.results.length);

			if (mediaData && mediaData.genres) {
				setSimilarGenres(mediaData.genres);
			}
			if (similarMediaData) {
				setSimilarMedia(similarMediaData);
			}

			setMediaDetail(mediaData);

			if (mediaVideosData && mediaVideosData.results.length > 0) {
				const video = mediaVideosData.results.find(
					(video: any) => video.type === 'Trailer' || video.type === 'Teaser' || (video.type === 'Clip' && video.site === 'YouTube')
				);
				if (video) {
					setVideoKey(video.key);
				}
				setMediaDetailVideos(mediaVideosData.results);
			} else {
				setMediaDetailVideos(null);
			}
			setLoadingComponents(false);
		}

		fetchMediaDetail();

		// setTimeout(() => {
		// 	fetchMediaDetail();
		// }, 2000000);
	}, [id, type]);

	const handleFavoriteClick = () => {
		if (!['movies', 'tv'].includes(mediaType)) {
			console.error(`Invalid media type: ${type}`);
			return;
    }
    
    const MEDIA_TYPE = type as 'movies' | 'tv'

    if (mediaDetail) {
      saveFavoriteMedia(MEDIA_TYPE, mediaDetail);
    }
		
  };
  
//   const isMovie = (media: MovieInterface | TVInterface): media is MovieInterface => {
//   return (media as MovieInterface).title !== undefined || (media as MovieInterface).original_title !== undefined;
// };

//   const isTV = (media: MovieInterface | TVInterface): media is TVInterface => {
//   return (media as TVInterface).name !== undefined || (media as TVInterface).original_name !== undefined;
// };

	return (
		<>
			{loadingComponents ? (
				<MediaDetailSkeleton />
			) : (
				<div className="text-black dark:text-gray-100">
					<div className="flex flex-wrap gap-5 mb-6 flex-col items-center sm:flex-row md:items-normal">
						<div className="flex-1 w-full sm:max-w-[320px] h-[460px] p-4 rounded-lg bg-blue-100 dark:bg-indigo-950 flex justify-center relative">
							{mediaDetail?.poster_path === null ? (
								<BigPosterPathNullSkeleton />
							) : (
								<img
									className="w-full sm:w-full max-w-full max-h-full rounded-lg cursor-pointer"
									src={`https://image.tmdb.org/t/p/w300/${mediaDetail?.poster_path}`}
									alt="Media Poster"
								/>
							)}
							<div className="absolute top-4 left-2 right-0 flex justify-between p-2 pl-3 text-2xl z-10">
								<span
									className={`absolute cursor-pointer z-20 transition-colors duration-300 ease-in-out ${
										isFavorite ? 'text-fuchsia-500' : 'text-slate-300'
									}`}
									onClick={handleFavoriteClick}>
									<BiBookmarkHeart />
								</span>
							</div>
						</div>
						<div className="flex-[2] flex flex-col gap-4 bg-blue-100 dark:bg-indigo-950 p-4 rounded-lg w-full sm:h-[460px]">
							<div>
								<h2 className="text-xl">{type === 'movies' ? mediaDetail?.original_title || mediaDetail?.title : mediaDetail?.name}</h2>
								<div className="flex items-center">
									{mediaDetail.vote_average} <LiaStarSolid className="ml-1 text-fuchsia-500" />
								</div>
							</div>

							<h3 className="text-lg">{mediaDetail?.tagline}</h3>
							<div className="flex flex-wrap flex-col gap-2.5">
								<p>{`Conteo de votos: ${mediaDetail?.vote_count}.`}</p>
								<p>{`Fecha de lanzamiento: ${mediaDetail.release_date || mediaDetail.first_air_date}.`}</p>
								<p>
									{type === 'movies'
										? `Duración: ${mediaDetail?.runtime !== undefined ? `${mediaDetail?.runtime} minutos.` : 'minutos'}`
										: `Duración de episodio aproximadamente: ${
												mediaDetail?.episode_run_time[0] !== undefined ? `${mediaDetail?.episode_run_time[0]} minutos` : 'minutos'
										  }.`}
								</p>

								<p>{`Estado: ${mediaDetail?.status}.`} </p>
							</div>
							{!mediaDetailVideos ? (
								<h3>No trailer or teaser available</h3>
							) : (
								<button
									className="w-60 bg-fuchsia-700 dark:bg-indigo-700 border-none p-2.5 px-5 text-base cursor-pointer rounded-md transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 flex items-center justify-center text-white dark:text-gray-100"
									onClick={() => setShowTrailer(true)}>
									<BiSolidMoviePlay className="mr-2" />
									Ver Trailer
								</button>
							)}
						</div>
					</div>

					<div className={'flex gap-6 mb-6 flex-col sm:flex-row'}>
						<div className={'flex-grow bg-blue-100 dark:bg-indigo-950 p-4 rounded-lg w-full  sm:w-[80%]'}>
							<h3>Sinopsis</h3>
							<p>{mediaDetail?.overview === '' ? 'No description available' : mediaDetail?.overview}</p>
						</div>

						<div className={'flex-grow bg-blue-100 dark:bg-indigo-950 p-4 rounded-lg flex gap-2.5 min-w-[200px] flex-wrap justify-center'}>
							<h3>Similar Genres:</h3>
							{similarGenres.length === 0 ? <SimilarGenresNullSkeleton /> : <CreateSimilarGenres genres={similarGenres} type={mediaType} />}
						</div>
					</div>

					<h3 className="mb-8">Similar to watch about {type}</h3>
					{<CreateSimilarMediaDetail media={{ results: similarMedia }} type={type} />}

					<TrailerMedia isOpen={showTrailer} onClose={() => setShowTrailer(false)} videoKey={videoKey} />
				</div>
			)}
		</>
	);
}

export { MediaDetail };
