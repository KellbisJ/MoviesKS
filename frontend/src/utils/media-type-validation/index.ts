import { MediaTypeT } from '@/types/media-type';

const isValidMediaType = (value: string): value is MediaTypeT => {
	return Object.values(MediaTypeT).includes(value as MediaTypeT);
};

const getValidMediaType = (value: string, fallback: MediaTypeT = MediaTypeT.movie): MediaTypeT => {
	return isValidMediaType(value) ? value : fallback;
};

/**
 * The first path segment that names a type: /tv → tv, /search/tv/dark → tv.
 * Only whole segments count, so a query like /search/movie/tvland stays movie.
 */
const mediaTypeFromPath = (pathname: string, fallback: MediaTypeT = MediaTypeT.movie): MediaTypeT => {
	return pathname.split('/').find(isValidMediaType) ?? fallback;
};

export { isValidMediaType, getValidMediaType, mediaTypeFromPath };
