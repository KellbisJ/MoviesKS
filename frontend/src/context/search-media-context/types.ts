import { MediaTypeT } from '@/types/media-type';

interface SearchContextInterface {
	searchQuery: string;
	updateSearchQuery: (query: string) => void;
	mediaType: MediaTypeT;
	updateMediaType: (type: MediaTypeT) => void;
}

export { SearchContextInterface };
