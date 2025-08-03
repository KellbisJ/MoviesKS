import { Link } from 'react-router-dom';
import { useSavedMedia } from '../../../context/favorite-media-context';
import { MediaNullSkeleton, MediaNullSkeletonHome } from '@/components/utilities/loading-skeletons';
import { Save, Star } from 'lucide-react';
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

const MediaContainer: React.FC<MediaContainerPropsInterface> = ({ media_, type, variant }) => {
	const { savedMedia } = useSavedMedia();
	const favoriteMedia = savedMedia[type === MediaTypeT.movie ? 'movies' : MediaTypeT.tv] || [];
	const isFavorite = favoriteMedia.some((favMedia) => favMedia.id === media_.id);

	const handleSaveMedia = UseHandleSaveMedia();

	const containerClasses =
		variant === 'Minimal'
			? 'group relative w-full h-full rounded-lg transition-transform duration-300 hover:scale-105 active:scale-[1.03] p-2'
			: 'group w-full h-full flex flex-col relative';

	const aspectClass =
		variant === 'Minimal'
			? 'h-full w-full object-cover aspect-[2/3]'
			: 'w-full h-auto aspect-[2/1.5] sm:aspect-auto sm:h-full';

	const mediaTitle = isMovie(media_) ? media_.title : media_.name;

	const skeleton =
		variant === 'Minimal' ? (
			<MediaNullSkeletonHome data={media_} type={type} title={mediaTitle} />
		) : (
			<MediaNullSkeleton data={media_} type={type} title={mediaTitle} />
		);

	const title = isMovie(media_) ? media_.title : media_.name;
	const imgSize = variant === 'Minimal' ? 'w185' : 'w342';

	return (
		<div className={containerClasses} style={{ touchAction: 'manipulation' }}>
			{media_.poster_path === null ? (
				skeleton
			) : (
				<Link
					to={`/${type}/detail/${media_.id}`}
					className="block w-full h-full relative overflow-hidden rounded-lg shadow-lg cursor-pointer">
					<img
						className={`${aspectClass} opacity-0 transition-opacity duration-500 bg-gray-800`}
						alt={isMovie(media_) ? media_.title : media_.name}
						src={`https://image.tmdb.org/t/p/${imgSize}/${media_.poster_path}`}
						onLoad={(e) => (e.currentTarget.style.opacity = '1')} // nice
					/>
					<button
						onClick={handleSaveMedia(type, media_)}
						className={`absolute top-1 opacity-0 group-hover:opacity-100 right-1 p-2 rounded-full backdrop-blur-sm transition-all z-[1] ${
							isFavorite
								? 'text-[#16C47F] bg-[#16C47F]/20'
								: 'text-gray-200 hover:text-[#16C47F] bg-gray-800/30 hover:bg-[#16C47F]/20'
						}`}>
						<Save className="w-6 h-6" />
					</button>

					<div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity">
						<span className="text-white text-center px-2 text-sm md:text-base">{title}</span>
					</div>

					<div className="absolute bottom-2 right-2 flex items-center space-x-1 bg-black bg-opacity-50 text-yellow-400 text-sm px-1 rounded opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity">
						<Star className="w-4 h-4" />
						<span>{media_.vote_average.toFixed(1)}</span>
					</div>
				</Link>
			)}
		</div>
	);
};

export { MediaContainer };
