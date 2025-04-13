import { Link } from 'react-router-dom';
import { useSavedMedia } from '../../../context/favorite-media-context';
import { MediaNullSkeleton } from '@/components/utilities/loading-skeletons';
import { Save } from 'lucide-react';
import { MovieInterface, TVInterface } from '../../../types/movie-and-tv-interface';
import { MediaContainerPropsInterface } from './types';
import { MovieDetailInterface, TVDetailInterface } from '@/services/media-detail/types';
import { MediaTypeT } from '@/types/media-type';
import { UseHandleSaveMedia } from '@/hooks/use-handle-save-media';

const isMovie = (
	media: MovieInterface | TVInterface | MovieDetailInterface | TVDetailInterface
): media is MovieInterface | MovieDetailInterface => {
	return (media as MovieInterface | MovieDetailInterface).title !== undefined;
}; // type checking

const MediaContainer: React.FC<MediaContainerPropsInterface> = ({ media_, type }) => {
	const { savedMedia } = useSavedMedia();
	const favoriteMedia = savedMedia[type === MediaTypeT.movie ? 'movies' : MediaTypeT.tv] || [];
	const isFavorite = favoriteMedia.some((favMedia) => favMedia.id === media_.id);

	const handleSaveMedia = UseHandleSaveMedia();

	return (
		<div
			className="group w-full h-full flex flex-col relative"
			style={{ touchAction: 'manipulation' }}>
			{media_.poster_path === null ? (
				<MediaNullSkeleton
					data={media_}
					type={type}
					title={isMovie(media_) ? media_.title : media_.name}
				/>
			) : (
				<Link
					to={`/${type}/detail/${media_.id}`}
					className="block w-full h-full relative overflow-hidden rounded-lg shadow-lg cursor-pointer">
					<img
						className="w-full h-auto aspect-[2/1.5] sm:aspect-auto sm:h-full srounded-lg shadow-lg cursor-pointer opacity-0 transition-opacity duration-500 hover:shadow-xl"
						alt={isMovie(media_) ? media_.title : media_.name}
						src={`https://image.tmdb.org/t/p/w400/${media_.poster_path}`}
						onLoad={(e) => (e.currentTarget.style.opacity = '1')} // nice
					/>
					<button
						onClick={handleSaveMedia(type, media_)}
						className={`absolute top-1 opacity-0 group-hover:opacity-100 right-1 p-2 rounded-full backdrop-blur-sm transition-all ${
							isFavorite
								? 'text-cyan-400 bg-cyan-400/20'
								: 'text-gray-200 hover:text-cyan-400 bg-gray-800/30 hover:bg-cyan-400/20'
						}`}>
						<Save className="w-6 h-6" />
					</button>
				</Link>
			)}
		</div>
	);
};

export { MediaContainer };
