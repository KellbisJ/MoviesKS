import React, { useEffect, useState } from 'react';
import { getMediaDetail } from '../services/MediaDetail';
import { getSimilarMediaDetail } from '../services/SimilarMediaDetail';
import { useMenuContext } from '../context/MenuContext';
import { CreateSimilarGenres } from '../components/CreateSimilarGenres';
import { CreateSimilarMediaDetail } from '../components/CreateSimilarMediaDetail';
import { useParams } from 'react-router-dom';
import { BigPosterPathSkeleton, BigPosterPathNullSkeleton, SimilarGenresNullSkeleton, SimilarMediaSkeleton } from '../components/LoadingSkeletons';

function MediaDetail() {
	const { setShowMenuComponents } = useMenuContext();
	const { id, type } = useParams();
	const [loadingComponents, setLoadingComponents] = useState(true);
	const [mediaDetail, setMediaDetail] = useState(null);
	const [similarGenres, setSimilarGenres] = useState([]);
	const [similarMedia, setSimilarMedia] = useState([]);

	useEffect(() => {
		setShowMenuComponents(false);
		return () => setShowMenuComponents(true);
	}, [setShowMenuComponents]);

	useEffect(() => {
		setLoadingComponents(true);
		async function fetchMediaDetail() {
			const mediaData = await getMediaDetail(id, type);
			const similarMediaData = await getSimilarMediaDetail(id, type);
			console.log(mediaData);

			if (mediaData && mediaData.genres) {
				setSimilarGenres(mediaData.genres);
			}
			if (similarMediaData) {
				setSimilarMedia(similarMediaData.results);
			}
			setLoadingComponents(false);
			setMediaDetail(mediaData);
		}

		fetchMediaDetail();
	}, [id, type]);

	if (!mediaDetail) {
		return <div>Loading...</div>;
	}

	return (
		<div className="mediaDetailContainer">
			<div className="mediaDetailInformation">
				<h2>{type === 'movies' ? mediaDetail.title : mediaDetail.name}</h2>
				<p>{mediaDetail.tagline}</p>
			</div>
			<div className="mediaDetailImageContainer">
				{loadingComponents ? (
					<BigPosterPathSkeleton />
				) : mediaDetail.poster_path === null ? (
					<BigPosterPathNullSkeleton />
				) : (
					<img className="mediaDetailImage" src={`https://image.tmdb.org/t/p/w500/${mediaDetail.poster_path}`} alt="Media Poster" />
				)}
			</div>

			<div className="mediaDetailInformationOverview">
				<div className="mediaOverview">
					<h3>Sinopsis</h3>
					<p>{mediaDetail.overview === '' ? 'No description available' : mediaDetail.overview}</p>
				</div>

				<div className="mediaDetailSimilarGenres">
					{similarGenres.length == 0 ? <SimilarGenresNullSkeleton /> : <CreateSimilarGenres genres={similarGenres} type={type} />}
				</div>
			</div>

			<div className="SimilarMediaContainer">
				<h3>Similar to watch {type}</h3>
				{loadingComponents ? <SimilarMediaSkeleton /> : <CreateSimilarMediaDetail media={{ results: similarMedia }} type={type} />}
			</div>
		</div>
	);
}

export { MediaDetail };
