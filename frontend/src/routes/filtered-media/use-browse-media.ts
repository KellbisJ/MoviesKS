import { useCallback, useEffect, useRef, useState } from 'react';
import { getBrowseMedia } from '@/services/browse-media';
import { BrowseFilters } from '@/services/browse-media/types';
import { MovieInterface, TVInterface } from '@/types/movie-and-tv-interface';
import { MediaTypeT } from '@/types/media-type';
import { browseKey } from './browse-params';

type BrowseItem = MovieInterface | TVInterface;

interface BrowseState {
	key: string;
	items: BrowseItem[];
	page: number;
	totalPages: number;
	totalResults: number;
	status: 'loading' | 'ready' | 'error';
	more: 'idle' | 'loading' | 'error';
}

const initialState = (key: string, items: BrowseItem[] = []): BrowseState => ({
	key,
	items,
	page: 0,
	totalPages: 0,
	totalResults: 0,
	status: 'loading',
	more: 'idle',
});

/**
 * Paged results for one filter set. Responses for an older filter set are
 * ignored (compared by key), so fast chip toggling never shows a stale grid.
 */
const useBrowseMedia = (type: MediaTypeT, filters: BrowseFilters, language: string) => {
	const key = browseKey(type, filters, language);
	const [state, setState] = useState<BrowseState>(() => initialState(key));
	const [attempt, setAttempt] = useState(0);
	const keyRef = useRef(key);
	keyRef.current = key;

	// Filters are captured through the key; keep the latest object for loadMore.
	const filtersRef = useRef(filters);
	filtersRef.current = filters;

	useEffect(() => {
		// Keep the previous items on screen (dimmed) while the new set loads.
		setState((prev) => initialState(key, prev.items));

		getBrowseMedia({ type, ...filtersRef.current, page: 1 })
			.then((data) => {
				if (keyRef.current !== key) return;
				setState({
					key,
					items: data.results,
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
	}, [key, type, attempt]);

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
		getBrowseMedia({ type, ...filtersRef.current, page: nextPage })
			.then((data) => {
				setState((cur) => {
					if (cur.key !== requestKey) return cur;
					// TMDB pages shift while popularity changes; drop repeats.
					const seen = new Set(cur.items.map((item) => item.id));
					return {
						...cur,
						items: [...cur.items, ...data.results.filter((item) => !seen.has(item.id))],
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
	}, [type]);

	const isCurrent = state.key === key;
	return {
		items: state.items,
		status: isCurrent ? state.status : 'loading',
		more: isCurrent ? state.more : 'idle',
		totalResults: isCurrent ? state.totalResults : 0,
		hasMore: isCurrent && state.status === 'ready' && state.page < state.totalPages,
		loadMore,
		retry: () => setAttempt((n) => n + 1),
	};
};

export type { BrowseItem };
export { useBrowseMedia };
