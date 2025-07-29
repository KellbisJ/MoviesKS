import { MediaTypeT } from '@/types/media-type';
import { api, API_MEDIA_IMAGES } from '../index';
import { MediaImagesInterface } from './types';

async function getMediaImages(type: `${MediaTypeT}`, id: string): Promise<MediaImagesInterface> {
	try {
		const { data: media }: { data: MediaImagesInterface } = await api.get(
			API_MEDIA_IMAGES(type, id)
		);

		return media;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export { getMediaImages };
