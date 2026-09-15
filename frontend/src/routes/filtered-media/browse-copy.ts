import { BrowseFilters, BrowseSort } from '@/services/browse-media/types';
import { GenreInterface } from '@/types/genre-interface';
import { MediaTypeT } from '@/types/media-type';

const sortLabel = (sort: BrowseSort, isEs: boolean): string => {
	switch (sort) {
		case 'trending':
			return isEs ? 'Tendencia hoy' : 'Trending today';
		case 'popular':
			return isEs ? 'Más populares' : 'Most popular';
		case 'top_rated':
			return isEs ? 'Mejor valoradas' : 'Top rated';
		case 'newest':
			return isEs ? 'Más recientes' : 'Newest';
	}
};

const typeNoun = (type: MediaTypeT, isEs: boolean) =>
	type === MediaTypeT.movie ? (isEs ? 'Películas' : 'Movies') : isEs ? 'Series' : 'TV series';

/**
 * Page heading. With genres it names them ("Acción + Comedia"); without, it
 * names the list ("Películas en tendencia hoy").
 */
const browseTitle = (type: MediaTypeT, filters: BrowseFilters, genres: GenreInterface[], isEs: boolean): string => {
	const names = filters.genres
		.map((id) => genres.find((genre) => genre.id === id)?.name)
		.filter((name): name is string => Boolean(name));

	if (filters.genres.length > 0) {
		return names.length > 0 ? names.join(' + ') : isEs ? `${typeNoun(type, true)} filtradas` : `Filtered ${typeNoun(type, false).toLowerCase()}`;
	}

	const noun = typeNoun(type, isEs);
	switch (filters.sort) {
		case 'trending':
			return isEs ? `${noun} en tendencia hoy` : `Trending ${noun.toLowerCase()} today`;
		case 'popular':
			return isEs ? `${noun} más populares` : `Most popular ${noun.toLowerCase()}`;
		case 'top_rated':
			return isEs ? `${noun} mejor valoradas` : `Top-rated ${noun.toLowerCase()}`;
		case 'newest':
			return isEs ? `${noun} más recientes` : `Newest ${noun.toLowerCase()}`;
	}
};

// TMDB reports a placeholder-sized total (e.g. 20 001) for very broad queries; don't present it as exact.
const COUNT_CAP = 10000;

const countLabel = (count: number, isEs: boolean) => {
	const capped = count > COUNT_CAP;
	const formatted = `${Math.min(count, COUNT_CAP).toLocaleString(isEs ? 'es-MX' : 'en-US')}${capped ? '+' : ''}`;
	return isEs ? `${formatted} ${count === 1 ? 'título' : 'títulos'}` : `${formatted} ${count === 1 ? 'title' : 'titles'}`;
};

export { sortLabel, typeNoun, browseTitle, countLabel };
