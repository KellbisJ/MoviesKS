import React, { useEffect, useState } from 'react';
import { getMediaDetail } from '../services/getMediaDetail';
import { getSimilarMediaDetail } from '../services/SimilarMediaDetail';
import { useMenuContext } from '../context/MenuContext';
import { useFavoriteMedia } from '../context/FavoriteMediaContext';
import { CreateSimilarGenres } from '../components/CreateSimilarGenres';
import { CreateSimilarMediaDetail } from '../components/CreateSimilarMediaDetail';
import { useParams } from 'react-router-dom';

function MediaDetail() {
	const { setShowMenuComponents } = useMenuContext();
	const { id, type } = useParams(); // Obtener id y tipo de los parámetros de la URL
	const [mediaDetail, setMediaDetail] = useState(null);
	const [similarGenres, setSimilarGenres] = useState([]);
	const [similarMedia, setSimilarMedia] = useState([]);

	useEffect(() => {
		setShowMenuComponents(false);
		return () => setShowMenuComponents(true);
	}, [setShowMenuComponents]);

	useEffect(() => {
		async function fetchMediaDetail() {
			const mediaData = await getMediaDetail(id, type);
			const similarMediaData = await getSimilarMediaDetail(id, type);

			if (mediaData && mediaData.genres) {
				const similarGenresData = CreateSimilarGenres(mediaData.genres);
				setSimilarGenres(similarGenresData);
			}
			if (similarMediaData) {
				setSimilarMedia(<CreateSimilarMediaDetail media={similarMediaData} type={type} />);
			}
			setMediaDetail(mediaData);
		}

		fetchMediaDetail();
	}, [id, type]);

	if (!mediaDetail) {
		return <div>Loading...</div>;
	}

	return (
		<div className="mediaDetailContainer">
			<div className="mediaDetail">
				<img src={`https://image.tmdb.org/t/p/w500/${mediaDetail.poster_path}`} alt={mediaDetail.title} />
			</div>
			<div className="mediaDetailInfo">
				<div className="MediaDetailSimilarGenres">{similarGenres}</div>
			</div>
			<div className="SimilarMoviesContainer">{similarMedia}</div>
		</div>
	);
}

export { MediaDetail };
