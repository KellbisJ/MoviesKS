import { MovieDetailInterface, TVDetailInterface } from '@/services/media-detail/types';
import { MediaTypeT } from '@/types/media-type';
import { MovieInterface, TVInterface } from '@/types/movie-and-tv-interface';

/** Anything a save button can be pressed on: list items or full detail objects. */
type SaveableMedia = MovieInterface | TVInterface | MovieDetailInterface | TVDetailInterface;

/**
 * What is persisted per title: only what a poster card needs, plus when it was
 * saved. Full detail objects used to be stored and filled the storage quota.
 */
interface SavedMovie {
	id: number;
	title: string;
	poster_path: string | null;
	vote_average: number;
	savedAt: number;
}

interface SavedTV {
	id: number;
	name: string;
	poster_path: string | null;
	vote_average: number;
	savedAt: number;
}

interface SavedCollection {
	movies: SavedMovie[];
	tv: SavedTV[];
}

type SavedItem = SavedMovie | SavedTV;

interface RemovedEntry {
	type: MediaTypeT;
	item: SavedItem;
	/** Increments per removal, so the same title removed twice still notifies. */
	seq: number;
}

interface SaveMediaContextInterface {
	savedMedia: SavedCollection;
	/** Toggles a title in its track. */
	saveMedia: (mediaType: MediaTypeT, media: SaveableMedia) => void;
	/** Puts a removed title back with its original savedAt (undo). */
	restoreMedia: (mediaType: MediaTypeT, item: SavedItem) => void;
	/** The last title removed in this tab, for undo and focus handling. */
	lastRemoved: RemovedEntry | null;
	/** True when the browser refused the last write (quota, private mode). */
	storageFailed: boolean;
	dismissStorageError: () => void;
}

export type { SaveableMedia, SavedMovie, SavedTV, SavedCollection, SavedItem, RemovedEntry, SaveMediaContextInterface };
