import { useCallback, useEffect, useState } from 'react';
import { MediaTypeT } from '@/types/media-type';
import { LanguageISOCode } from '@/types/languages';
import { MovieInterface, TVInterface } from '@/types/movie-and-tv-interface';
import { MediaImagesInterface } from '@/services/media-images/types';
import { AuthorReview } from '@/services/reviews/types';
import { MediaVideosResultInterface } from '@/services/media-videos/types';
import { getSimilarMediaDetail } from '@/services/similar-media-detail';
import { getMediaVideos } from '@/services/media-videos';
import { getMediaImages } from '@/services/media-images';
import { getMediaReviews } from '@/services/reviews';

/** One section's fetch result; `null` data means that request failed. */
type Section<T> = { data: T; failed: false } | { data: null; failed: true };

interface MediaExtras {
	loading: boolean;
	similar: Section<(MovieInterface | TVInterface)[]>;
	videos: Section<MediaVideosResultInterface[]>;
	images: Section<MediaImagesInterface>;
	reviews: Section<AuthorReview[]>;
	retry: () => void;
}

const settle = <T>(result: PromiseSettledResult<T>): Section<T> =>
	result.status === 'fulfilled' ? { data: result.value, failed: false } : { data: null, failed: true };

const EMPTY = {
	similar: { data: [], failed: false },
	videos: { data: [], failed: false },
	images: { data: { id: 0, backdrops: [], logos: [], posters: [] } as MediaImagesInterface, failed: false },
	reviews: { data: [], failed: false },
} as const satisfies Omit<MediaExtras, 'loading' | 'retry'>;

type ExtrasState = Omit<MediaExtras, 'retry'>;

/**
 * Similar titles, videos, images and reviews for a detail page. Each request
 * settles on its own, so a failed reviews call doesn't blank the other tabs.
 */
const useMediaExtras = (type: MediaTypeT, id: string, language: LanguageISOCode): MediaExtras => {
	const [state, setState] = useState<ExtrasState>({ loading: true, ...EMPTY });
	const [attempt, setAttempt] = useState(0);

	useEffect(() => {
		let cancelled = false;
		setState({ loading: true, ...EMPTY });

		Promise.allSettled([
			getSimilarMediaDetail(type, id),
			getMediaVideos(type, id),
			getMediaImages(type, id),
			getMediaReviews(type, id, language),
		]).then(([similar, videos, images, reviews]) => {
			if (cancelled) return;
			const videosSection = settle(videos);
			const reviewsSection = settle(reviews);
			setState({
				loading: false,
				similar: settle(similar),
				videos: videosSection.failed ? videosSection : { data: videosSection.data.results, failed: false },
				images: settle(images),
				reviews: reviewsSection.failed ? reviewsSection : { data: reviewsSection.data.results ?? [], failed: false },
			});
		});

		return () => {
			cancelled = true;
		};
	}, [type, id, language, attempt]);

	const retry = useCallback(() => setAttempt((n) => n + 1), []);

	return { ...state, retry };
};

/** Best YouTube video to open from "Watch trailer": official trailer, then any trailer, teaser, clip. */
const pickTrailer = (videos: MediaVideosResultInterface[]): MediaVideosResultInterface | undefined => {
	const youtube = videos.filter((video) => video.site === 'YouTube' && video.key);
	const rank = (video: MediaVideosResultInterface) =>
		(video.type === 'Trailer' ? 0 : video.type === 'Teaser' ? 2 : video.type === 'Clip' ? 4 : 6) + (video.official ? 0 : 1);
	return [...youtube].filter((video) => rank(video) < 6).sort((a, b) => rank(a) - rank(b))[0];
};

export { useMediaExtras, pickTrailer };
export type { MediaExtras, Section };
