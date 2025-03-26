import { useNavigate } from 'react-router-dom';
import { useSavedMedia } from '../../context/favorite-media-context';
import { MediaNullSkeletonHome } from '../loading-skeletons';
import { Save } from 'lucide-react';
import { MovieInterface, TVInterface } from '../../types/movie-and-tv-interface';
import { MediaContainerPropsInterface } from '../media-container/types';
import { MovieDetailInterface, TVDetailInterface } from '@/services/media-detail/types';
import { MediaTypeT } from '@/types/media-type';
import { UseHandleSaveMedia } from '@/hooks/use-handle-save-media';

const isMovie = (media: MovieInterface | TVInterface | MovieDetailInterface | TVDetailInterface): media is MovieInterface | MovieDetailInterface => {
	return (media as MovieInterface | MovieDetailInterface).title !== undefined;
}; // type checking

const MediaContainerMinimalist: React.FC<MediaContainerPropsInterface> = ({ media_, type }) => {
	const { savedMedia } = useSavedMedia();

	const favoriteMedia = savedMedia[type === MediaTypeT.movie ? 'movies' : MediaTypeT.tv] || []; // validation type and adding a checking if type is 'movie' search on movies array of saved
	const isFavorite = favoriteMedia.some((favMedia) => favMedia.id === media_.id);
	const navigate = useNavigate();

	const handleNavigation = () => {
		const idParam = media_.id;
		navigate(`/${type}/detail/${idParam}`);
	};
	const handleSaveMedia = UseHandleSaveMedia();

	return (
		<div className="group relative w-full h-full rounded-lg transition-transform duration-300 hover:scale-105 p-2">
			{media_.poster_path === null ? (
				<MediaNullSkeletonHome data={media_} type={type} title={isMovie(media_) ? media_.title : media_.name} />
			) : (
				<div className="relative w-full h-full overflow-hidden rounded-lg shadow-lg cursor-pointer">
					<img
						className="h-full w-full object-cover aspect-[2/3] opacity-0 transition-opacity duration-500"
						alt={isMovie(media_) ? media_.title : media_.name}
						src={`https://image.tmdb.org/t/p/w300/${media_.poster_path}`}
						onClick={handleNavigation}
						onLoad={(e) => (e.currentTarget.style.opacity = '1')} // nice
					/>

					<div
						className={`absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity size-6 cursor-pointer drop-shadow-lg ${
							isFavorite ? 'text-cyan-400' : 'text-gray-200 hover:text-cyan-400'
						}`}
						onClick={handleSaveMedia(type, media_)}>
						<Save />
					</div>
				</div>
			)}
		</div>
	);
};

export { MediaContainerMinimalist };
