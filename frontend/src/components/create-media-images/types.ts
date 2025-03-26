import { MediaImagesInterface } from '@/services/media-images/types';
import { MediaTypeT } from '@/types/media-type';

interface CreateMediaImagePropsInterface {
	media: MediaImagesInterface;
	type: MediaTypeT;
}

export { CreateMediaImagePropsInterface };
