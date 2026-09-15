import { MediaTypeT } from '@/types/media-type';
import { SaveableMedia, SavedCollection, SavedItem, SavedMovie, SavedTV } from './types';

const STORAGE_KEY = 'favoriteMedia';

const emptyCollection = (): SavedCollection => ({ movies: [], tv: [] });

const trackOf = (type: MediaTypeT): keyof SavedCollection => (type === MediaTypeT.movie ? 'movies' : 'tv');

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null;

const num = (value: unknown, fallback = 0) => (typeof value === 'number' && Number.isFinite(value) ? value : fallback);

/**
 * Keeps only well-formed entries, drops duplicate ids, and slims old full
 * objects. Entries saved before savedAt existed get their list position, which
 * keeps their relative order and sorts them before any real timestamp.
 */
const normalizeTrack = <T extends SavedItem>(raw: unknown, toItem: (entry: Record<string, unknown>, index: number) => T | null): T[] => {
	if (!Array.isArray(raw)) return [];
	const seen = new Set<number>();
	const items: T[] = [];
	raw.forEach((entry, index) => {
		if (!isRecord(entry)) return;
		const item = toItem(entry, index);
		if (!item || seen.has(item.id)) return;
		seen.add(item.id);
		items.push(item);
	});
	return items;
};

const toMovie = (entry: Record<string, unknown>, index: number): SavedMovie | null => {
	if (typeof entry.id !== 'number') return null;
	return {
		id: entry.id,
		title: typeof entry.title === 'string' ? entry.title : '',
		poster_path: typeof entry.poster_path === 'string' ? entry.poster_path : null,
		vote_average: num(entry.vote_average),
		savedAt: num(entry.savedAt, index),
	};
};

const toTV = (entry: Record<string, unknown>, index: number): SavedTV | null => {
	if (typeof entry.id !== 'number') return null;
	return {
		id: entry.id,
		name: typeof entry.name === 'string' ? entry.name : '',
		poster_path: typeof entry.poster_path === 'string' ? entry.poster_path : null,
		vote_average: num(entry.vote_average),
		savedAt: num(entry.savedAt, index),
	};
};

const normalizeCollection = (raw: unknown): SavedCollection => {
	if (!isRecord(raw)) return emptyCollection();
	return { movies: normalizeTrack(raw.movies, toMovie), tv: normalizeTrack(raw.tv, toTV) };
};

/** Reads the collection. Missing, corrupt or old-shaped data never throws. */
const readSaved = (): SavedCollection => {
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		return stored ? normalizeCollection(JSON.parse(stored)) : emptyCollection();
	} catch {
		return emptyCollection();
	}
};

/** Returns false when the browser refuses the write (quota, disabled storage). */
const writeSaved = (collection: SavedCollection): boolean => {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(collection));
		return true;
	} catch {
		return false;
	}
};

const toSavedItem = (type: MediaTypeT, media: SaveableMedia, savedAt: number): SavedItem => {
	const entry = media as unknown as Record<string, unknown>;
	return type === MediaTypeT.movie ? { ...toMovie(entry, 0)!, savedAt } : { ...toTV(entry, 0)!, savedAt };
};

export { STORAGE_KEY, emptyCollection, trackOf, readSaved, writeSaved, toSavedItem, normalizeCollection };
