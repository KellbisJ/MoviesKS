import React, { useEffect, useState } from 'react';
import { getMediaDetail } from '../services/MediaDetail';
import { getSimilarMediaDetail } from '../services/SimilarMediaDetail';
import { getMediaVideos } from '../services/MediaVideos';
import { useMenuContext } from '../context/MenuContext';
import { CreateSimilarGenres } from '../components/CreateSimilarGenres';
import { CreateSimilarMediaDetail } from '../components/CreateSimilarMediaDetail';
import { useParams } from 'react-router-dom';
import { BigPosterPathSkeleton, BigPosterPathNullSkeleton, SimilarGenresNullSkeleton, SimilarMediaSkeleton } from '../components/LoadingSkeletons';
import { TrailerMedia } from '../common/Modals';

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
		async function fetchMediaDetail() {
			const mediaData = await getMediaDetail(id, type);
			const similarMediaData = await getSimilarMediaDetail(id, type);
			const mediaVideosData = await getMediaVideos(id, type);

			console.log(mediaData);
			// console.log(mediaVideosData.results.length);

			if (mediaData && mediaData.genres) {
				setSimilarGenres(mediaData.genres);
			}
			if (similarMediaData) {
				setSimilarMedia(similarMediaData.results);
			}

			setMediaDetail(mediaData);

			if (mediaVideosData && mediaVideosData.results.length > 0) {
				const video = mediaVideosData.results.find((video) => video.type === 'Trailer' || (video.type === 'Teaser' && video.site === 'YouTube'));
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
		return <div style={{ display: 'flex', margin: '120px auto 300px auto', justifyContent: 'center' }}>Loading...</div>;
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
						<img className="mediaDetailImage" src={`https://image.tmdb.org/t/p/w500/${mediaDetail.poster_path}`} alt="Media Poster" />
					)}
				</div>
				<div className="mediaDetailInformation">
					<h2>{type === 'movies' ? mediaDetail.original_title || mediaDetail.title : mediaDetail.name}</h2>
					<p>{mediaDetail.tagline}</p>
					<div className="mediaDetailInformationRateDate">
						<p>Rate: {mediaDetail.vote_average}</p>
						<p>Vote Count: {mediaDetail.vote_count}</p>
						<p>Release Date: {mediaDetail.release_date || mediaDetail.first_air_date}</p>
						<p>Runtime: {mediaDetail.runtime} minutes</p>
						<p>Status: {mediaDetail.status}</p>
					</div>
					{!mediaDetailVideos ? (
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

			{/* <div className="mediaDetailInformationProduction">
				<h3 style={{ textAlign: 'center' }}>Production Companies</h3>
				<div className="mediaProductionCompaniesContainer">
					{mediaDetail.production_companies.map((company) => (
						<div key={company.id} className="mediaProductionCompanies">
							<img src={`https://image.tmdb.org/t/p/w500/${company.logo_path}`} alt={company.name} />
							<p>{company.name}</p>
							<p>{company.origin_country}</p>
						</div>
					))}
					{mediaDetail.production_companies.length === 0 && 'No production companies available'}
				</div>
			</div> */}

			<div className="mediaDetailInformationOverview">
				<div className="mediaOverview">
					<h3>Sinopsis</h3>
					<p>{mediaDetail.overview === '' ? 'No description available' : mediaDetail.overview}</p>
				</div>

				<div className="mediaDetailSimilarGenres">
					<h3>Similar Genres:</h3>
					{similarGenres.length == 0 ? <SimilarGenresNullSkeleton /> : <CreateSimilarGenres genres={similarGenres} type={type} />}
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
