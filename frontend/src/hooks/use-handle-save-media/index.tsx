import { useSavedMedia } from '@/context/favorite-media-context';
import { MediaTypeT } from '@/types/media-type';
import { MovieDetailInterface, TVDetailInterface } from '@/services/media-detail/types';
import { MovieInterface, TVInterface } from '@/types/movie-and-tv-interface';

const UseHandleSaveMedia = () => {
	const { saveMedia } = useSavedMedia();

	const handleSaveMedia =
		(
			type: MediaTypeT,
			media: MovieInterface | TVInterface | MovieDetailInterface | TVDetailInterface
		) =>
		(event: React.MouseEvent<HTMLSpanElement>) => {
			if (type === MediaTypeT.movie || type === MediaTypeT.tv) {
				event.preventDefault();
				event.stopPropagation();
				saveMedia(type, media);
				return;
			}
			console.error(`invalid type ${type}`);
		};

	return handleSaveMedia;
};

export { UseHandleSaveMedia };
