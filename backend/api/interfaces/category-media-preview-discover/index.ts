import { MovieInterface } from '../movie';
import { TVInterface } from '../tv';

interface CategoryMediaPreviewDiscoverInterface {
	page: number;
	results: MovieInterface[] | TVInterface[];
	total_pages: number;
	total_results: number;
}
export { CategoryMediaPreviewDiscoverInterface };
