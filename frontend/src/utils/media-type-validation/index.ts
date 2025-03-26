import { MediaTypeT } from '@/types/media-type';

const isValidMediaType = (value: string): value is MediaTypeT => {
	return Object.values(MediaTypeT).includes(value as MediaTypeT);
};

const getValidMediaType = (value: string, fallback: MediaTypeT = MediaTypeT.movie): MediaTypeT => {
	return isValidMediaType(value) ? value : fallback;
};

export { isValidMediaType, getValidMediaType };
