import { MovieInterface, TVInterface } from '../movies-and-tvseries/types';

interface GenreInterface {
	id: number;
	name: string;
}

interface PreviewCategoriesMediaInterface {
	genres: GenreInterface[];
}

interface CategoryMediaPreviewDiscoverInterface {
	page: number;
	results: MovieInterface[] | TVInterface[];
	total_pages: number;
	total_results: number;
}

export { CategoryMediaPreviewDiscoverInterface, GenreInterface, PreviewCategoriesMediaInterface };
