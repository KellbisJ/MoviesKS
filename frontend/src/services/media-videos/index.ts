import { api, API_MEDIA_VIDEOS } from '../index';
import { MediaVideosInterface } from './types';
import { MediaTypeT } from '@/types/media-type';

async function getMediaVideos(type: `${MediaTypeT}`, id: string): Promise<MediaVideosInterface> {
	try {
		const { data: media }: { data: MediaVideosInterface } = await api.get(
			API_MEDIA_VIDEOS(type, id)
		);

		// console.log({ media });
		if (media && media.id && media.results && media.results.length > 0) {
			return media;
		} else {
			return {
				id: parseInt(id, 10),
				results: [],
			};
		}
	} catch (error) {
		console.error('Error fetching media videos:', error);
		return {
			id: parseInt(id, 10),
			results: [],
		};
	}
}

export { getMediaVideos };
