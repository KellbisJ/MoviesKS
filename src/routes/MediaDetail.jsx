import React, { useEffect, useState } from 'react';
import { getMediaDetail } from '../services/getMediaDetail';
import { useMenuContext } from '../context/MenuContext';
import { useFavoriteMedia } from '../context/FavoriteMediaContext';
import { createSimilarGenres } from '../components/CreateSimilarGenres';
import { useParams } from 'react-router-dom';

function MediaDetail() {
	const { setShowMenuComponents } = useMenuContext();
	const { id, type } = useParams(); // Obtener id y tipo de los parámetros de la URL
	const [mediaDetail, setMediaDetail] = useState(null);
	const [similarGenres, setSimilarGenres] = useState([]);

	useEffect(() => {
		setShowMenuComponents(false);
		return () => setShowMenuComponents(true);
	}, [setShowMenuComponents]);

	useEffect(() => {
		async function fetchMediaDetail() {
			const mediaData = await getMediaDetail(id, type);

			if (mediaData && mediaData.genres) {
				const similarGenresData = createSimilarGenres(mediaData.genres);
				setSimilarGenres(similarGenresData);
			}

			setMediaDetail(mediaData);
		}

		fetchMediaDetail();
	}, [id, type]);

	if (!mediaDetail) {
		return <div>Cargando...</div>;
	}

	return (
		<div className="mediaDetailContainer">
			<div className="mediaDetail">
				<img src={`https://image.tmdb.org/t/p/w500/${mediaDetail.poster_path}`} alt={mediaDetail.title} />
			</div>
			<div className="mediaDetailInfo">
				<div className="MediaDetailSimilarGenres">{similarGenres}</div>
			</div>
		</div>
	);
}

export { MediaDetail };
