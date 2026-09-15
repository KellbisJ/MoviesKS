import { MovieDetailInterface, TVDetailInterface } from '@/services/media-detail/types';
import { MediaTypeT } from '@/types/media-type';

interface MediaDetailPropsInterface {
	media: MovieDetailInterface | TVDetailInterface;
	mediaType: MediaTypeT;
	mediaId: string;
	isEs: boolean;
}

export { MediaDetailPropsInterface };
