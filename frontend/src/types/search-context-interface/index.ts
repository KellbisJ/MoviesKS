interface SearchContextInterface {
	searchQuery: string;
	updateSearchQuery: (query: string) => void;
	mediaType: string;
	updateMediaType: (type: string) => void;
}

export { SearchContextInterface };
