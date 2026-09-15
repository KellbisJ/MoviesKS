import { useSyncExternalStore } from 'react';

const DARK_MODE_STORAGE_KEY = 'MOVIESKS_DARK_MODE';

// One module-level store so every theme toggle (desktop navbar, mobile bar,
// sidebar, provider) reads and writes the same value.
const readInitialMode = (): boolean => {
	if (typeof window === 'undefined') return false;
	const savedMode = localStorage.getItem(DARK_MODE_STORAGE_KEY);
	return savedMode ? JSON.parse(savedMode) : window.matchMedia('(prefers-color-scheme: dark)').matches;
};

let isDarkModeStore = readInitialMode();
const listeners = new Set<() => void>();

const applyMode = (isDark: boolean) => {
	if (typeof window === 'undefined') return;
	window.document.documentElement.classList.toggle('dark', isDark);
};

applyMode(isDarkModeStore);

const setDarkMode = (isDark: boolean) => {
	if (isDark === isDarkModeStore) return;
	isDarkModeStore = isDark;
	applyMode(isDark);
	localStorage.setItem(DARK_MODE_STORAGE_KEY, JSON.stringify(isDark));
	listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
	listeners.add(listener);
	return () => listeners.delete(listener);
};

const useDarkMode = () => {
	const isDarkMode = useSyncExternalStore(
		subscribe,
		() => isDarkModeStore,
		() => false
	);

	return [isDarkMode, setDarkMode] as const;
};

export { useDarkMode };
