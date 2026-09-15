import { useCallback, useEffect, useRef, useState } from 'react';
import { getMediaBySearch } from '@/services/media-by-search';
import { MovieInterface, TVInterface } from '@/types/movie-and-tv-interface';
import { MediaTypeT } from '@/types/media-type';

type SearchItem = MovieInterface | TVInterface;

interface SearchState {
	key: string;
	items: SearchItem[];
	page: number;
	totalPages: number;
	totalResults: number;
	status: 'loading' | 'ready' | 'error';
	more: 'idle' | 'loading' | 'error';
}

const initialState = (key: string): SearchState => ({
	key,
	items: [],
	page: 0,
	totalPages: 0,
	totalResults: 0,
	status: 'loading',
	more: 'idle',
});

const unique = (items: SearchItem[], seen = new Set<number>()) =>
	items.filter((item) => (seen.has(item.id) ? false : (seen.add(item.id), true)));

/**
 * Paged search results for one type + query + language. A new search starts
 * from page 1 with an empty grid, and responses for an older search are
 * ignored (compared by key), so fast re-searching never mixes lists.
 */
const useSearchMedia = (type: MediaTypeT, query: string, language: string) => {
	const key = `${type}|${query}|${language}`;
	const [state, setState] = useState<SearchState>(() => initialState(key));
	const [attempt, setAttempt] = useState(0);
	const keyRef = useRef(key);
	keyRef.current = key;

	useEffect(() => {
		setState(initialState(key));

		getMediaBySearch(type, query, 1)
			.then((data) => {
				if (keyRef.current !== key) return;
				setState({
					key,
					items: unique(data.results),
					page: 1,
					totalPages: data.total_pages,
					totalResults: data.total_results,
					status: 'ready',
					more: 'idle',
				});
			})
			.catch(() => {
				if (keyRef.current !== key) return;
				setState({ ...initialState(key), status: 'error' });
			});
	}, [key, type, query, attempt]);

	const stateRef = useRef(state);
	stateRef.current = state;
	const pendingPageRef = useRef<string | null>(null);

	const loadMore = useCallback(() => {
		const prev = stateRef.current;
		if (prev.key !== keyRef.current || prev.status !== 'ready' || prev.page >= prev.totalPages) return;

		const requestKey = prev.key;
		const nextPage = prev.page + 1;
		const pendingId = `${requestKey}#${nextPage}`;
		// The observer and the button can both fire; one request per page.
		if (pendingPageRef.current === pendingId) return;
		pendingPageRef.current = pendingId;

		setState((cur) => (cur.key === requestKey ? { ...cur, more: 'loading' } : cur));
		getMediaBySearch(type, query, nextPage)
			.then((data) => {
				setState((cur) => {
					if (cur.key !== requestKey) return cur;
					return {
						...cur,
						items: [...cur.items, ...unique(data.results, new Set(cur.items.map((item) => item.id)))],
						page: nextPage,
						totalPages: data.total_pages,
						more: 'idle',
					};
				});
			})
			.catch(() => {
				setState((cur) => (cur.key === requestKey ? { ...cur, more: 'error' } : cur));
			})
			.finally(() => {
				if (pendingPageRef.current === pendingId) pendingPageRef.current = null;
			});
	}, [type, query]);

	const isCurrent = state.key === key;
	return {
		items: isCurrent ? state.items : [],
		status: isCurrent ? state.status : 'loading',
		more: isCurrent ? state.more : 'idle',
		totalResults: isCurrent ? state.totalResults : 0,
		hasMore: isCurrent && state.status === 'ready' && state.page < state.totalPages,
		loadMore,
		retry: () => setAttempt((n) => n + 1),
	};
};

export { useSearchMedia };
