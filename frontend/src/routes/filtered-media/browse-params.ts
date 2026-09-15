import { BrowseFilters, BrowseSort } from '@/services/browse-media/types';

const SORTS: BrowseSort[] = ['trending', 'popular', 'top_rated', 'newest'];
const DEFAULT_SORT: BrowseSort = 'trending';
const MIN_YEAR = 1950;

const currentYear = () => new Date().getFullYear();

/** Newest first, back to MIN_YEAR. */
const yearOptions = (): number[] =>
	Array.from({ length: currentYear() - MIN_YEAR + 1 }, (_, i) => currentYear() - i);

/** Reads filters from the URL, silently dropping anything malformed. */
const parseBrowseFilters = (params: URLSearchParams): BrowseFilters => {
	const genres = [
		...new Set(
			(params.get('genres') ?? '')
				.split(',')
				.map((id) => Number(id))
				.filter((id) => Number.isInteger(id) && id > 0)
		),
	];

	const rawYear = Number(params.get('year'));
	const year = Number.isInteger(rawYear) && rawYear >= MIN_YEAR && rawYear <= currentYear() ? rawYear : null;

	const rawSort = params.get('sort') as BrowseSort | null;
	let sort: BrowseSort = rawSort && SORTS.includes(rawSort) ? rawSort : DEFAULT_SORT;
	// Trending can't be filtered on TMDB, so filters imply popularity.
	if (sort === 'trending' && (genres.length > 0 || year !== null)) sort = 'popular';

	return { genres, sort, year };
};

/** Serializes filters, leaving defaults out so URLs stay short. */
const toBrowseSearch = ({ genres, sort, year }: BrowseFilters): string => {
	const params = new URLSearchParams();
	if (genres.length > 0) params.set('genres', genres.join(','));
	const hasFilters = genres.length > 0 || year !== null;
	if (sort !== DEFAULT_SORT && !(sort === 'popular' && hasFilters)) params.set('sort', sort);
	if (year !== null) params.set('year', String(year));
	const search = params.toString();
	return search ? `?${search}` : '';
};

const browseKey = (type: string, { genres, sort, year }: BrowseFilters, language: string) =>
	[type, genres.join(','), sort, year ?? '', language].join('|');

export { SORTS, DEFAULT_SORT, yearOptions, parseBrowseFilters, toBrowseSearch, browseKey };
