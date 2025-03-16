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

const MediaContainer: React.FC<MediaContainerPropsInterface> = ({ media_, type }) => {
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
		<div className="w-full h-full flex flex-col relative">
			{media_.poster_path === null ? (
				<MediaNullSkeleton data={media_} type={type} title={isMovie(media_) ? media_.title : media_.name} />
			) : (
				<img
					className="min-w-full min-h-60 max-h-60 md:min-h-80 md:max-h-80 lg:min-h-96 lg:max-h-96 overflow-hidden rounded-lg shadow-lg cursor-pointer"
					alt={isMovie(media_) ? media_.title : media_.name}
					src={`https://image.tmdb.org/t/p/w300/${media_.poster_path}`}
					onClick={handleNavigation}
				/>
			)}

			<div className="absolute top-0 left-0 right-0 flex justify-between p-2 pl-1 text-2xl  z-10">
				<span
					className={`absolute cursor-pointer z-20 transition-colors duration-300 ease-in-out ${
						isFavorite ? 'text-cyan-400' : 'text-gray-200 hover:text-cyan-400'
					}`}
					onClick={handleFavoriteClick}>
					<Save />
				</span>
			</div>
		</div>
	);
};

export { MediaContainer };
