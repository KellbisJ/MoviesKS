import React from 'react';
import './CreateMedia.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFavoriteMedia } from '../../context/FavoriteMediaContext';

const CreateMedia = ({ media = [], type }) => {
	const { favorites, saveFavoriteMedia } = useFavoriteMedia();
	const favoriteMedia = favorites[type] || [];

	const handleFavoriteClick = (item) => {
		saveFavoriteMedia(item, type);
	};

	return (
		<>
			{media.map((item, index) => (
				<div key={`${item.id}-${index}`} className="mediaContainer">
					<img className="mediaImg" alt={item.title} src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`} />
					<div className="mediaInfo">
						<span
							className="mediaFavoriteIcon"
							style={{ color: favoriteMedia.some((favItem) => favItem.id === item.id) ? '#ffd700' : '#7e7b7b' }}
							onClick={() => handleFavoriteClick(item)}>
							<FontAwesomeIcon icon="heart" />
						</span>
					</div>
				</div>
			))}
		</>
	);
};

export { CreateMedia };
