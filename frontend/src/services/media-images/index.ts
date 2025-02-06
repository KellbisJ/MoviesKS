import { api, API_MOVIE_IMAGES, API_TV_IMAGES } from '../index';
import { MediaImagesInterface } from '../../types/media-images-interface';

async function getMediaImages(type: string, id: string): Promise<MediaImagesInterface> {
	try {
		const apiUrl = type === 'movies' ? API_MOVIE_IMAGES(id) : API_TV_IMAGES(id);
		const { data: media }: { data: MediaImagesInterface } = await api.get(apiUrl);

		return media;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export { getMediaImages };
