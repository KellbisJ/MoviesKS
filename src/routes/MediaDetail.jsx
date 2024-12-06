import React, { useEffect, useState } from 'react';
import { getMediaDetail } from '../services/MediaDetail';
import { getSimilarMediaDetail } from '../services/SimilarMediaDetail';
import { getMediaVideos } from '../services/MediaVideos';
import { useMenuContext } from '../context/MenuContext';
import { CreateSimilarGenres } from '../components/CreateSimilarGenres';
import { CreateSimilarMediaDetail } from '../components/CreateSimilarMediaDetail';
import { useParams } from 'react-router-dom';
import {
	BigPosterPathSkeleton,
	BigPosterPathNullSkeleton,
	SimilarGenresNullSkeleton,
	SimilarMediaSkeleton,
	MediaDetailSkeleton,
} from '../components/LoadingSkeletons';
import { TrailerMedia } from '../common/Modals';
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

	useEffect(() => {
		if (mediaDetailVideos) {
			console.log(mediaDetailVideos);
		}
	}, [mediaDetailVideos]);

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
		<div className="mediaDetailContainer">
			<div className="mediaDetailHeader">
				<div className="mediaDetailImageContainer">
					{loadingComponents ? (
						<BigPosterPathSkeleton />
					) : mediaDetail.poster_path === null ? (
						<BigPosterPathNullSkeleton />
					) : (
						<img className="mediaDetailImage" src={`https://image.tmdb.org/t/p/w300/${mediaDetail.poster_path}`} alt="Media Poster" />
					)}
				</div>
				<div className="mediaDetailInformation">
					<h2 className={`${loadingComponents ? 'textSkeleton' : ''}`}>
						{loadingComponents ? '' : type === 'movies' ? mediaDetail.original_title || mediaDetail.title : mediaDetail.name}
					</h2>

					<p className={`${loadingComponents ? 'textSkeleton' : ''}`}>{loadingComponents ? '' : mediaDetail.tagline}</p>
					<div className="mediaDetailInformationRateDate">
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
							<button className="mediaTrailerButton" onClick={() => setShowTrailer(true)}>
								🎥 Watch Trailer or Teaser
							</button>
						</div>
					)}
				</div>
			</div>

			<div className={loadingComponents ? 'mediaDetailInformationOverviewSkeleton' : 'mediaDetailInformationOverview'}>
				<div className={loadingComponents ? 'mediaOverviewSkeleton' : 'mediaOverview'}>
					{loadingComponents && <div className="overviewSkeleton"></div>}
					{!loadingComponents && (
						<>
							<h3>Sinopsis</h3>
							<p>{mediaDetail.overview === '' ? 'No description available' : mediaDetail.overview}</p>
						</>
					)}
				</div>

				<div className={loadingComponents ? 'mediaDetailSimilarGenresSkeleton' : 'mediaDetailSimilarGenres'}>
					{loadingComponents && <div className="similarGenresSkeleton"></div>}
					{!loadingComponents && (
						<>
							<h3>Similar Genres:</h3>
							{similarGenres.length === 0 ? <SimilarGenresNullSkeleton /> : <CreateSimilarGenres genres={similarGenres} type={type} />}
						</>
					)}
				</div>
			</div>

			<div className="SimilarMediaContainer">
				<h3>Similar to watch {type}</h3>
				{loadingComponents ? <SimilarMediaSkeleton /> : <CreateSimilarMediaDetail media={{ results: similarMedia }} type={type} />}
			</div>

			<TrailerMedia isOpen={showTrailer} onClose={() => setShowTrailer(false)} videoKey={videoKey} />
		</div>
	);
}

export { MediaDetail };
