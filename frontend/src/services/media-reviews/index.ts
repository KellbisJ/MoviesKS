import { api, API_MEDIA_REVIEWS } from '..';
import { MediaReviewInterface } from './types';

async function getMediaReviews(
	type: string,
	id: string
): Promise<MediaReviewInterface | undefined> {
	try {
		if (type !== 'movie' && type !== 'tv') {
			console.error("Error, type is not 'movie' or 'tv'");
			return;
		}
		const { data: reviews }: { data: MediaReviewInterface } = await api.get(
			API_MEDIA_REVIEWS(type, id)
		);

		return reviews;
	} catch (err) {
		console.error('Error fetching media reviews:', err);
	}
}

export { getMediaReviews };
