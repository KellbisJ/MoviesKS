import { HomeMediaItem } from './types';

const mediaTitle = (item: HomeMediaItem): string => ('title' in item ? item.title : item.name);

const mediaYear = (item: HomeMediaItem): string =>
	String(('release_date' in item ? item.release_date : item.first_air_date) ?? '').slice(0, 4);

const mediaRating = (item: HomeMediaItem): string | null =>
	item.vote_average ? item.vote_average.toFixed(1) : null;

export { mediaTitle, mediaYear, mediaRating };
