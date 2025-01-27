import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFavoriteMedia } from '../../context/FavoriteMediaContext';
import { MediaNullSkeleton } from '../loading-skeletons';

const MediaContainer = ({ media_, type }) => {
	const { favorites, saveFavoriteMedia } = useFavoriteMedia();
	const favoriteMedia = favorites[type] || [];
	const isFavorite = favoriteMedia.some((favMedia) => favMedia.id === media_.id);
	const navigate = useNavigate();

	const handleNavigation = () => {
		const idParam = media_.id;
		navigate(`/${type}/detail/${idParam}`);
	};

	const handleFavoriteClick = () => {
		if (!['movies', 'tv'].includes(type)) {
			console.error(`Invalid media type: ${type}`);
			return;
		}
		saveFavoriteMedia(media_, type);
	};

	return (
		<div className="w-full h-full flex flex-col relative">
			{media_.poster_path === null ? (
				<MediaNullSkeleton data={media_} type={type} title={media_.title || media_.name} />
			) : (
				<img
					className="min-w-full min-h-60 max-h-60 md:min-h-80 md:max-h-80 lg:min-h-96 lg:max-h-96 overflow-hidden rounded-lg shadow-lg cursor-pointer"
					alt={media_.title}
					src={`https://image.tmdb.org/t/p/w300/${media_.poster_path}`}
					onClick={handleNavigation}
				/>
			)}

			<div className="absolute top-0 left-0 right-0 flex justify-between p-2 pl-3 text-white z-10">
				<span
					className={`absolute cursor-pointer z-20 text-[18px] transition-colors duration-300 ease-in-out hover:text-yellow-400 ${
						isFavorite ? 'text-yellow-400' : 'text-gray-600'
					}`}
					onClick={handleFavoriteClick}>
					<FontAwesomeIcon icon="heart" />
				</span>
			</div>
		</div>
	);
};

export { MediaContainer };
