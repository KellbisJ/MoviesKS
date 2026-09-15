import { useEffect, useState } from 'react';
import { getPreviewCategories } from '@/services/preview-categories';
import { GenreInterface } from '@/types/genre-interface';
import { MediaTypeT } from '@/types/media-type';

type GenresState = { key: string; genres: GenreInterface[]; failed: boolean };

// Genre lists barely change; fetch each type+language once per session.
const cache = new Map<string, GenreInterface[]>();

const useGenres = (type: MediaTypeT, language: string) => {
	const key = `${type}|${language}`;
	const [attempt, setAttempt] = useState(0);
	const [state, setState] = useState<GenresState>(() => ({
		key,
		genres: cache.get(key) ?? [],
		failed: false,
	}));

	useEffect(() => {
		const cached = cache.get(key);
		if (cached) {
			setState({ key, genres: cached, failed: false });
			return;
		}

		let cancelled = false;
		setState({ key, genres: [], failed: false });
		getPreviewCategories(type)
			.then(({ genres }) => {
				cache.set(key, genres);
				if (!cancelled) setState({ key, genres, failed: false });
			})
			.catch(() => {
				if (!cancelled) setState({ key, genres: [], failed: true });
			});

		return () => {
			cancelled = true;
		};
	}, [key, type, attempt]);

	const current = state.key === key;
	return {
		genres: current ? state.genres : [],
		loading: !current || (state.genres.length === 0 && !state.failed),
		failed: current && state.failed,
		retry: () => setAttempt((n) => n + 1),
	};
};

export { useGenres };
