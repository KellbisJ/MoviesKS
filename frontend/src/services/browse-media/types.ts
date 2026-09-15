import { MovieInterface, TVInterface } from '@/types/movie-and-tv-interface';
import { MediaTypeT } from '@/types/media-type';

type BrowseSort = 'trending' | 'popular' | 'top_rated' | 'newest';

interface BrowseFilters {
	genres: number[];
	sort: BrowseSort;
	year: number | null;
}

interface BrowseRequest extends BrowseFilters {
	type: MediaTypeT;
	page: number;
}

interface BrowseMediaPage {
	page: number;
	results: (MovieInterface | TVInterface)[];
	total_pages: number;
	total_results: number;
}

export type { BrowseSort, BrowseFilters, BrowseRequest, BrowseMediaPage };
