import React, { useEffect, useState } from 'react';
import { getMediaDetail } from '../services/MediaDetail';
import { getSimilarMediaDetail } from '../services/SimilarMediaDetail';
import { getMediaVideos } from '../services/MediaVideos';
import { useMenuContext } from '../context/MenuContext';
import { CreateSimilarGenres } from '../components/create-similar-genres';
import { CreateSimilarMediaDetail } from '../components/create-similar-media-detail';
import { useParams } from 'react-router-dom';
import {
	BigPosterPathSkeleton,
	BigPosterPathNullSkeleton,
	SimilarGenresNullSkeleton,
	SimilarMediaSkeleton,
	MediaDetailSkeleton,
} from '../components/loading-skeletons';
import { TrailerMedia } from '../components/modals/trailer-media';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

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

	// useEffect(() => {
	// 	if (mediaDetailVideos) {
	// 		console.log(mediaDetailVideos);
	// 	}
	// }, [mediaDetailVideos]);

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
		<div className="text-black">
			<div className="flex flex-wrap gap-5 mb-6 flex-col items-center sm:flex-row md:items-normal">
				<div className="flex-1 sm:max-w-[320px] h-[460px] p-4 rounded-lg bg-slate-200 flex justify-center">
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
				</div>
				<div className="flex-2 flex flex-col gap-4 bg-slate-200 p-4 rounded-lg w-full sm:h-[460px]">
					<h2 className={`${loadingComponents ? 'textSkeleton' : ''}`}>
						{loadingComponents ? '' : type === 'movies' ? mediaDetail.original_title || mediaDetail.title : mediaDetail.name}
					</h2>

					<p className={`${loadingComponents ? 'textSkeleton' : ''}`}>{loadingComponents ? '' : mediaDetail.tagline}</p>
					<div className="flex flex-wrap flex-col gap-2.5">
						<p className={`${loadingComponents ? 'textSkeleton' : ''}`}>
							{loadingComponents ? (
								''
							) : (
								<>
									Rating: {mediaDetail.vote_average} <FontAwesomeIcon icon={faStar} style={{ color: 'yellow' }} />
								</>
							)}
						</p>

						<p className={`${loadingComponents ? 'textSkeleton' : ''}`}>{loadingComponents ? '' : `Conteo de votos: ${mediaDetail.vote_count}.`}</p>
						<p className={`${loadingComponents ? 'textSkeleton' : ''}`}>
							{loadingComponents ? '' : `Fecha de lanzamiento: ${mediaDetail.release_date || mediaDetail.first_air_date}.`}
						</p>
						<p className={`${loadingComponents ? 'textSkeleton' : ''}`}>
							{loadingComponents
								? ''
								: type === 'movies'
								? `Duración: ${mediaDetail.runtime !== undefined ? `${mediaDetail.runtime} minutos.` : 'minutos'}`
								: `Duración de episodio aproximadamente: ${
										mediaDetail.episode_run_time[0] !== undefined ? `${mediaDetail.episode_run_time[0]} minutos` : 'minutos'
								  }.`}
						</p>

						<p className={`${loadingComponents ? 'textSkeleton' : ''}`}>{loadingComponents ? '' : `Estado: ${mediaDetail.status}.`} </p>
					</div>
					{loadingComponents ? (
						''
					) : !mediaDetailVideos ? (
						<div className="mediaDetailInformationVideos">No trailer or teaser available</div>
					) : (
						<div className="mediaDetailInformationVideos">
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
				<div className={loadingComponents ? 'mediaOverviewSkeleton' : 'flex-grow bg-slate-200 p-4 rounded-lg w-full  sm:w-[80%]'}>
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
							: 'flex-grow bg-slate-200 p-4 rounded-lg flex gap-2.5 min-w-[200px] flex-wrap justify-center'
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
