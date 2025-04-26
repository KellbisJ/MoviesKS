import { Link } from 'react-router-dom';
import { useSavedMedia } from '../../../context/favorite-media-context';
import { MediaNullSkeletonHome } from '@/components/utilities/loading-skeletons';
import { Save } from 'lucide-react';
import { MovieInterface, TVInterface } from '../../../types/movie-and-tv-interface';
import { MediaContainerPropsInterface } from '../media-container/types';
import { MovieDetailInterface, TVDetailInterface } from '@/services/media-detail/types';
import { MediaTypeT } from '@/types/media-type';
import { UseHandleSaveMedia } from '@/hooks/use-handle-save-media';

const isMovie = (
	media: MovieInterface | TVInterface | MovieDetailInterface | TVDetailInterface
): media is MovieInterface | MovieDetailInterface => {
	return (media as MovieInterface | MovieDetailInterface).title !== undefined;
}; // type checking

const MediaContainerMinimalist: React.FC<MediaContainerPropsInterface> = ({ media_, type }) => {
	const { savedMedia } = useSavedMedia();

	const favoriteMedia = savedMedia[type === MediaTypeT.movie ? 'movies' : MediaTypeT.tv] || []; // validation type and adding a checking if type is 'movie' search on movies array of saved
	const isFavorite = favoriteMedia.some((favMedia) => favMedia.id === media_.id);

	const handleSaveMedia = UseHandleSaveMedia();

	return (
		<div
			className="group relative w-full h-full rounded-lg transition-transform duration-300 hover:scale-105 active:scale-[1.03] p-2"
			style={{ touchAction: 'manipulation' }}>
			{media_.poster_path === null ? (
				<MediaNullSkeletonHome
					data={media_}
					type={type}
					title={isMovie(media_) ? media_.title : media_.name}
				/>
			) : (
				<Link
					to={`/${type}/detail/${media_.id}`}
					className="block w-full h-full relative overflow-hidden rounded-lg shadow-lg cursor-pointer">
					<img
						className="h-full w-full object-cover aspect-[2/3] opacity-0 transition-opacity duration-500 bg-gray-800"
						alt={isMovie(media_) ? media_.title : media_.name}
						src={`https://image.tmdb.org/t/p/w300/${media_.poster_path}`}
						onLoad={(e) => (e.currentTarget.style.opacity = '1')}
					/>

					<button
						onClick={handleSaveMedia(type, media_)}
						className={`absolute top-1 opacity-0 group-hover:opacity-100 group-active:opacity-100 right-1 p-2 rounded-full backdrop-blur-sm transition-all ${
							isFavorite
								? 'text-[#16C47F] bg-[#16C47F]/20'
								: 'text-gray-200 hover:text-[#16C47F] bg-gray-800/30 hover:bg-[#16C47F]/20'
						} md:group-hover:opacity-100 active:opacity-100`}>
						<Save className="w-6 h-6" />
					</button>
				</Link>
			)}
		</div>
	);
};

export { MediaContainerMinimalist };
