import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { MediaTypeT } from '@/types/media-type';
import { RemovedEntry, SaveableMedia, SavedCollection, SavedItem, SaveMediaContextInterface } from './types';
import { STORAGE_KEY, emptyCollection, readSaved, toSavedItem, trackOf, writeSaved } from './storage';

const SavedMediaContext = createContext<SaveMediaContextInterface>({
	savedMedia: emptyCollection(),
	saveMedia: () => {},
	restoreMedia: () => {},
	lastRemoved: null,
	storageFailed: false,
	dismissStorageError: () => {},
});

const SavedMediaProvider = ({ children }: { children: React.ReactNode }) => {
	// Read synchronously on first render: no empty-collection flash before hydration.
	const [savedMedia, setSavedMedia] = useState<SavedCollection>(readSaved);
	const [lastRemoved, setLastRemoved] = useState<RemovedEntry | null>(null);
	const [storageFailed, setStorageFailed] = useState(false);
	const seqRef = useRef(0);
	const memoryRef = useRef(savedMedia);
	const writeFailedRef = useRef(false);

	// Another tab changed the collection: adopt it, so this tab never writes over it.
	useEffect(() => {
		const onStorage = (event: StorageEvent) => {
			if (event.key !== STORAGE_KEY && event.key !== null) return;
			const next = readSaved();
			memoryRef.current = next;
			writeFailedRef.current = false;
			setSavedMedia(next);
		};
		window.addEventListener('storage', onStorage);
		return () => window.removeEventListener('storage', onStorage);
	}, []);

	/**
	 * Every change starts from what is in storage right now (read-modify-write),
	 * so saves made in other tabs since this tab last rendered are kept.
	 */
	const commit = useCallback((change: (current: SavedCollection) => SavedCollection) => {
		// After a refused write, storage is behind this tab; keep building on memory instead.
		const next = change(writeFailedRef.current ? memoryRef.current : readSaved());
		const written = writeSaved(next);
		writeFailedRef.current = !written;
		memoryRef.current = next;
		setStorageFailed(!written);
		setSavedMedia(next);
	}, []);

	const saveMedia = useCallback(
		(mediaType: MediaTypeT, media: SaveableMedia) => {
			if (mediaType !== MediaTypeT.movie && mediaType !== MediaTypeT.tv) return;
			const track = trackOf(mediaType);
			let removed: SavedItem | undefined;

			commit((current) => {
				const list: SavedItem[] = current[track];
				removed = list.find((item) => item.id === media.id);
				const nextList = removed
					? list.filter((item) => item.id !== media.id)
					: [...list, toSavedItem(mediaType, media, Date.now())];
				return { ...current, [track]: nextList };
			});

			if (removed) {
				seqRef.current += 1;
				setLastRemoved({ type: mediaType, item: removed, seq: seqRef.current });
			}
		},
		[commit]
	);

	const restoreMedia = useCallback(
		(mediaType: MediaTypeT, item: SavedItem) => {
			const track = trackOf(mediaType);
			commit((current) => {
				const list: SavedItem[] = current[track];
				if (list.some((saved) => saved.id === item.id)) return current;
				return { ...current, [track]: [...list, item].sort((a, b) => a.savedAt - b.savedAt) };
			});
			setLastRemoved(null);
		},
		[commit]
	);

	const value = useMemo(
		() => ({
			savedMedia,
			saveMedia,
			restoreMedia,
			lastRemoved,
			storageFailed,
			dismissStorageError: () => setStorageFailed(false),
		}),
		[savedMedia, saveMedia, restoreMedia, lastRemoved, storageFailed]
	);

	return <SavedMediaContext.Provider value={value}>{children}</SavedMediaContext.Provider>;
};

const useSavedMedia = () => useContext(SavedMediaContext);

export { SavedMediaProvider, useSavedMedia };
