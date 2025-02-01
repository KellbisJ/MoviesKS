import { TVInterface } from '../tv';

interface PreviewTvInterface {
	page: number;
	results: TVInterface[];
	total_pages: number;
	total_results: number;
}

export { PreviewTvInterface };
