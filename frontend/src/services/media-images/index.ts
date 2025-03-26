import { MediaTypeT } from '@/types/media-type';
import { api, API_MOVIE_IMAGES, API_TV_IMAGES } from '../index';
import { MediaImagesInterface } from './types';

async function getMediaImages(type: `${MediaTypeT}`, id: string): Promise<MediaImagesInterface> {
	try {
		const apiUrl = type === MediaTypeT.movie ? API_MOVIE_IMAGES(id) : API_TV_IMAGES(id);
		const { data: media }: { data: MediaImagesInterface } = await api.get(apiUrl);

		return media;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export { getMediaImages };
