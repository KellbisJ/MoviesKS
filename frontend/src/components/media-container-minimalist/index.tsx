import { useNavigate } from 'react-router-dom';
import { useFavoriteMedia } from '../../context/favorite-media-context';
import { MediaNullSkeleton } from '../loading-skeletons';
import { Save } from 'lucide-react';
import { MovieInterface, TVInterface } from '../../types/movie-and-tv-interface';
import { MediaContainerPropsInterface } from '../../types/media-container-props-interface';
import { MovieDetailInterface, TVDetailInterface } from '@/types/media-detail-interface';

const isMovie = (media: MovieInterface | TVInterface | MovieDetailInterface | TVDetailInterface): media is MovieInterface | MovieDetailInterface => {
	return (media as MovieInterface | MovieDetailInterface).title !== undefined;
}; // type checking

const MediaContainerMinimalist: React.FC<MediaContainerPropsInterface> = ({ media_, type }) => {
	const { favorites, saveFavoriteMedia } = useFavoriteMedia();
	const favoriteMedia = favorites[type as 'movies' | 'tv'] || [];
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

		if (saveFavoriteMedia) {
			saveFavoriteMedia(type as 'movies' | 'tv', media_);
		}
		// else {
		//   console.error('saveFavoriteMedia is not defined');
		// }
	};

	return (
		<div className="group relative w-full h-full rounded-lg transition-transform duration-300 hover:scale-105 p-2">
			{media_.poster_path === null ? (
				<MediaNullSkeleton data={media_} type={type} title={isMovie(media_) ? media_.title : media_.name} />
			) : (
				<div className="relative w-full h-full overflow-hidden rounded-lg shadow-lg cursor-pointer">
					<img
						className="h-full w-full object-cover aspect-[2/3]"
						alt={isMovie(media_) ? media_.title : media_.name}
						src={`https://image.tmdb.org/t/p/w300/${media_.poster_path}`}
						onClick={handleNavigation}
					/>

					<div
						className={`absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity size-6 cursor-pointer drop-shadow-lg ${
							isFavorite ? 'text-cyan-400' : 'text-gray-200 hover:text-cyan-400'
						}`}
						onClick={handleFavoriteClick}>
						<Save />
					</div>
				</div>
			)}
		</div>
	);
};

export { MediaContainerMinimalist };
