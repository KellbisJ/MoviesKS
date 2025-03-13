import { useNavigate } from 'react-router-dom';
import { useFavoriteMedia } from '../../context/favorite-media-context';
import { MediaNullSkeleton } from '../loading-skeletons';
import { BiBookmarkHeart } from 'react-icons/bi';
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
		<div className="group relative w-full h-[90%] rounded-lg transition-transform duration-300 hover:scale-105 p-2">
			{media_.poster_path === null ? (
				<MediaNullSkeleton data={media_} type={type} title={isMovie(media_) ? media_.title : media_.name} />
			) : (
				<div className="relative h-full overflow-hidden rounded-lg shadow-lg cursor-pointer">
					<img
						className="h-full w-full object-cover aspect-[2/3]" // Maintain poster aspect ratio
						alt={isMovie(media_) ? media_.title : media_.name}
						src={`https://image.tmdb.org/t/p/w300/${media_.poster_path}`}
						onClick={handleNavigation}
					/>

					{/* Favorite button */}
					<div
						className={`absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity size-6 cursor-pointer drop-shadow-lg ${
							isFavorite ? 'text-cyan-400' : 'text-gray-200 hover:text-cyan-400'
						}`}
						onClick={handleFavoriteClick}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className={`size-6 cursor-pointer drop-shadow-lg ${isFavorite ? 'text-cyan-400' : 'text-gray-200 hover:text-cyan-400'}`}>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
							/>
						</svg>
					</div>
				</div>
			)}
		</div>
	);
};

export { MediaContainerMinimalist };
