import { MovieInterface, TVInterface } from '@/types/movie-and-tv-interface';
import { MovieDetailInterface, TVDetailInterface } from '@/services/media-detail/types';
import { MediaTypeT } from '@/types/media-type';
import { MediaImagesInterface } from '@/services/media-images/types';
import { MediaImageT } from '@/components/specific/create-media-images';

interface LazyMediaContainerProps {
	media_?: MovieInterface | TVInterface | MovieDetailInterface | TVDetailInterface;
	type?: MediaTypeT;
	containerType: 'Minimal' | 'Normal' | 'Similar' | 'Images';
	colSpan?: number;
	imgUrl?: string;
	mediaImg?: MediaImageT;
	allImages?: MediaImageT[];
	mediaImageId?: number;
}

export { LazyMediaContainerProps };
