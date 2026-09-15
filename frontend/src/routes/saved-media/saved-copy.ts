import { MediaTypeT } from '@/types/media-type';

type SavedSort = 'recent' | 'title' | 'rating';

const SAVED_SORTS: SavedSort[] = ['recent', 'title', 'rating'];

const savedSortLabel = (sort: SavedSort, isEs: boolean) => {
	switch (sort) {
		case 'recent':
			return isEs ? 'Recientes' : 'Recent';
		case 'title':
			return isEs ? 'Título' : 'Title';
		case 'rating':
			return isEs ? 'Calificación' : 'Rating';
	}
};

/** "1 película", "4 series", "1 movie", "4 TV series". */
const trackCount = (type: MediaTypeT, count: number, isEs: boolean) => {
	const n = count.toLocaleString(isEs ? 'es-MX' : 'en-US');
	if (type === MediaTypeT.movie) {
		return isEs ? `${n} ${count === 1 ? 'película' : 'películas'}` : `${n} ${count === 1 ? 'movie' : 'movies'}`;
	}
	return isEs ? `${n} ${count === 1 ? 'serie' : 'series'}` : `${n} TV series`;
};

const trackNoun = (type: MediaTypeT, isEs: boolean) =>
	type === MediaTypeT.movie ? (isEs ? 'Películas' : 'Movies') : isEs ? 'Series' : 'TV series';

export type { SavedSort };
export { SAVED_SORTS, savedSortLabel, trackCount, trackNoun };
