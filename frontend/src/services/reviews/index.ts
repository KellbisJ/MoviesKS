import { api, API_MEDIA_REVIEWS } from '..';
import { MediaTypeT } from '@/types/media-type';
import { MediaReviewInterface } from './types';

async function getMediaReviews(type: `${MediaTypeT}`, id: string): Promise<MediaReviewInterface> {
	try {
		const { data: reviews }: { data: MediaReviewInterface } = await api.get(
			API_MEDIA_REVIEWS(type, id)
		);

		return reviews;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export { getMediaReviews };
