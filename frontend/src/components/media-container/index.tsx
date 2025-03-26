import { useNavigate } from 'react-router-dom';
import { useSavedMedia } from '../../context/favorite-media-context';
import { MediaNullSkeleton } from '../loading-skeletons';
import { Save } from 'lucide-react';
import { MovieInterface, TVInterface } from '../../types/movie-and-tv-interface';
import { MediaContainerPropsInterface } from './types';
import { MovieDetailInterface, TVDetailInterface } from '@/services/media-detail/types';
import { MediaTypeT } from '@/types/media-type';
import { UseHandleSaveMedia } from '@/hooks/use-handle-save-media';

const isMovie = (media: MovieInterface | TVInterface | MovieDetailInterface | TVDetailInterface): media is MovieInterface | MovieDetailInterface => {
	return (media as MovieInterface | MovieDetailInterface).title !== undefined;
}; // type checking

const MediaContainer: React.FC<MediaContainerPropsInterface> = ({ media_, type }) => {
	const { savedMedia } = useSavedMedia();
	const favoriteMedia = savedMedia[type === MediaTypeT.movie ? 'movies' : MediaTypeT.tv] || [];
	const isFavorite = favoriteMedia.some((favMedia) => favMedia.id === media_.id);
	const navigate = useNavigate();

	const handleSaveMedia = UseHandleSaveMedia();

	const handleNavigation = () => {
		const idParam = media_.id;
		navigate(`/${type}/detail/${idParam}`);
	};

	return (
		<div className="w-full h-full flex flex-col relative">
			{media_.poster_path === null ? (
				<MediaNullSkeleton data={media_} type={type} title={isMovie(media_) ? media_.title : media_.name} />
			) : (
				<img
					className="w-full h-full aspect-[2/3] rounded-lg shadow-lg cursor-pointer opacity-0 transition-opacity duration-500 hover:shadow-xl"
					alt={isMovie(media_) ? media_.title : media_.name}
					src={`https://image.tmdb.org/t/p/w500/${media_.poster_path}`}
					onClick={handleNavigation}
					onLoad={(e) => (e.currentTarget.style.opacity = '1')} // nice
				/>
			)}

			<div className="absolute top-0 left-0 right-0 flex justify-between p-2 pl-1 text-2xl  z-10">
				<span
					className={`absolute cursor-pointer z-20 transition-colors duration-300 ease-in-out ${
						isFavorite ? 'text-cyan-400' : 'text-gray-200 hover:text-cyan-400'
					}`}
					onClick={handleSaveMedia(type, media_)}>
					<Save />
				</span>
			</div>
		</div>
	);
};

export { MediaContainer };
