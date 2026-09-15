import { MediaTypeT } from '@/types/media-type';
import { NavigateFunction } from 'react-router-dom';

// Keep letters and digits from any script (á, ñ, ü, 日本…) plus spaces.
const sanitizeQuery = (query: string): string =>
	query
		.replace(/[^\p{L}\p{N}\s]/gu, '')
		.replace(/\s+/g, ' ')
		.trim();

/** Navigates to the search page. Returns false when nothing searchable is left. */
const handleSearch = (e: React.FormEvent, query: string, navigate: NavigateFunction): boolean => {
	e.preventDefault();

	const sanitizedQuery = sanitizeQuery(query);
	if (sanitizedQuery.length === 0) return false; // an empty search query isn't allowed

	navigate(`/search/about/${encodeURIComponent(sanitizedQuery)}`);
	return true;
};

const handleSearch2 = (
	e: React.FormEvent,
	query: string,
	mediaType: MediaTypeT.movie | MediaTypeT.tv,
	navigate: NavigateFunction
): boolean => {
	e.preventDefault();

	const sanitizedQuery = sanitizeQuery(query);
	if (sanitizedQuery.length === 0) return false;

	navigate(`/search/${mediaType}/${encodeURIComponent(sanitizedQuery)}`);
	return true;
};

export { handleSearch, handleSearch2, sanitizeQuery };
