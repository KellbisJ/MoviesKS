import React, { useEffect, useState } from 'react';
import { getMediaDetail } from '../../services/MediaDetail';
import { getSimilarMediaDetail } from '../../services/SimilarMediaDetail';
import { getMediaVideos } from '../../services/MediaVideos';
import { useMenuContext } from '../../context/menu-context';
import { CreateSimilarGenres } from '../../components/create-similar-genres';
import { CreateSimilarMediaDetail } from '../../components/create-similar-media-detail';
import { useParams } from 'react-router-dom';
import {
	BigPosterPathSkeleton,
	BigPosterPathNullSkeleton,
	SimilarGenresNullSkeleton,
	SimilarMediaSkeleton,
	MediaDetailSkeleton,
} from '../../components/loading-skeletons';
import { TrailerMedia } from '../../components/modals/trailer-media';
import { useFavoriteMedia } from '../../context/favorite-media-context';
import { LiaStarSolid } from 'react-icons/lia';
import { BiBookmarkHeart } from 'react-icons/bi';

function MediaDetail() {
	const { setShowMenuComponents } = useMenuContext();

	useEffect(() => {
		setShowMenuComponents(false);
		return () => setShowMenuComponents(true);
	}, [setShowMenuComponents]);

	const { id, type } = useParams();
	const [loadingComponents, setLoadingComponents] = useState(true);
	const [mediaDetail, setMediaDetail] = useState(null);
	const [mediaDetailVideos, setMediaDetailVideos] = useState(null);
	const [similarGenres, setSimilarGenres] = useState([]);
	const [similarMedia, setSimilarMedia] = useState([]);
	const [showTrailer, setShowTrailer] = useState(false);
	const [videoKey, setVideoKey] = useState(null);

	const { favorites, saveFavoriteMedia } = useFavoriteMedia();
	const favoriteMedia = favorites[type] || [];
	const isFavorite = favoriteMedia.some((favMedia) => favMedia.id === mediaDetail?.id);

	useEffect(() => {
		setLoadingComponents(true);
		window.scrollTo(0, 0);
		async function fetchMediaDetail() {
			const mediaData = await getMediaDetail(id, type);
			const similarMediaData = await getSimilarMediaDetail(id, type);
			const mediaVideosData = await getMediaVideos(id, type);

			// console.log(mediaData);
			// console.log(mediaVideosData.results.length);

			if (mediaData && mediaData.genres) {
				setSimilarGenres(mediaData.genres);
			}
			if (similarMediaData) {
				setSimilarMedia(similarMediaData.results);
			}

			setMediaDetail(mediaData);

			if (mediaVideosData && mediaVideosData.results.length > 0) {
				const video = mediaVideosData.results.find(
					(video) => video.type === 'Trailer' || video.type === 'Teaser' || (video.type === 'Clip' && video.site === 'YouTube')
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
	}, [id, type]);

	const handleFavoriteClick = () => {
		if (!['movies', 'tv'].includes(type)) {
			console.error(`Invalid media type: ${type}`);
			return;
		}
		saveFavoriteMedia(mediaDetail, type);
	};

	if (!mediaDetail) {
		return <MediaDetailSkeleton />;
	}
	if (mediaDetail.status === 'Ended') {
		mediaDetail.status = 'Finalizado';
	}
	if (mediaDetail.status === 'Released') {
		mediaDetail.status = 'Publicada';
	}

	return (
		<div className="text-black dark:text-gray-100">
			<div className="flex flex-wrap gap-5 mb-6 flex-col items-center sm:flex-row md:items-normal">
				<div className="flex-1 sm:max-w-[320px] h-[460px] p-4 rounded-lg bg-slate-200 dark:bg-indigo-950 flex justify-center relative">
					{loadingComponents ? (
						<BigPosterPathSkeleton />
					) : mediaDetail.poster_path === null ? (
						<BigPosterPathNullSkeleton />
					) : (
						<img
							className="w-full sm:w-full max-w-full max-h-full rounded-lg cursor-pointer"
							src={`https://image.tmdb.org/t/p/w300/${mediaDetail.poster_path}`}
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
				<div className="flex-[2] flex flex-col gap-4 bg-slate-200 dark:bg-indigo-950 p-4 rounded-lg w-full sm:h-[460px]">
					<div>
						<h2 className="text-xl">
							{loadingComponents ? '' : type === 'movies' ? mediaDetail.original_title || mediaDetail.title : mediaDetail.name}{' '}
						</h2>
						<div className="flex items-center">
							{loadingComponents ? (
								''
							) : (
								<>
									{mediaDetail.vote_average} <LiaStarSolid className="ml-1 text-fuchsia-500" />
								</>
							)}
						</div>
					</div>

					<h3 className="text-lg">{loadingComponents ? '' : mediaDetail.tagline}</h3>
					<div className="flex flex-wrap flex-col gap-2.5">
						<p>{loadingComponents ? '' : `Conteo de votos: ${mediaDetail.vote_count}.`}</p>
						<p>{loadingComponents ? '' : `Fecha de lanzamiento: ${mediaDetail.release_date || mediaDetail.first_air_date}.`}</p>
						<p>
							{loadingComponents
								? ''
								: type === 'movies'
								? `Duración: ${mediaDetail.runtime !== undefined ? `${mediaDetail.runtime} minutos.` : 'minutos'}`
								: `Duración de episodio aproximadamente: ${
										mediaDetail.episode_run_time[0] !== undefined ? `${mediaDetail.episode_run_time[0]} minutos` : 'minutos'
								  }.`}
						</p>

						<p>{loadingComponents ? '' : `Estado: ${mediaDetail.status}.`} </p>
					</div>
					{loadingComponents ? (
						''
					) : !mediaDetailVideos ? (
						<div>No trailer or teaser available</div>
					) : (
						<div>
							<button
								className="bg-red-500 border-none p-2.5 px-5 text-base cursor-pointer rounded-md transition-colors duration-300 ease-in-out hover:bg-red-600"
								onClick={() => setShowTrailer(true)}>
								🎥 Watch Trailer or Teaser
							</button>
						</div>
					)}
				</div>
			</div>

			<div className={loadingComponents ? 'mediaDetailInformationOverviewSkeleton' : 'flex gap-6 mb-6 flex-col sm:flex-row'}>
				<div className={loadingComponents ? 'mediaOverviewSkeleton' : 'flex-grow bg-slate-200 dark:bg-indigo-950 p-4 rounded-lg w-full  sm:w-[80%]'}>
					{loadingComponents && <div className="overviewSkeleton"></div>}
					{!loadingComponents && (
						<>
							<h3>Sinopsis</h3>
							<p>{mediaDetail.overview === '' ? 'No description available' : mediaDetail.overview}</p>
						</>
					)}
				</div>

				<div
					className={
						loadingComponents
							? 'mediaDetailSimilarGenresSkeleton'
							: 'flex-grow bg-slate-200 dark:bg-indigo-950 p-4 rounded-lg flex gap-2.5 min-w-[200px] flex-wrap justify-center'
					}>
					{loadingComponents && <div className="similarGenresSkeleton"></div>}
					{!loadingComponents && (
						<>
							<h3>Similar Genres:</h3>
							{similarGenres.length === 0 ? <SimilarGenresNullSkeleton /> : <CreateSimilarGenres genres={similarGenres} type={type} />}
						</>
					)}
				</div>
			</div>

			<h3>Similar to watch about {type}</h3>
			{loadingComponents ? <SimilarMediaSkeleton /> : <CreateSimilarMediaDetail media={{ results: similarMedia }} type={type} />}

			<TrailerMedia isOpen={showTrailer} onClose={() => setShowTrailer(false)} videoKey={videoKey} />
		</div>
	);
}

export { MediaDetail };
