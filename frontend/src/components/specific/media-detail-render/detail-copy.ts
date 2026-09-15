import { MovieDetailInterface, TVDetailInterface } from '@/services/media-detail/types';

type MediaDetail = MovieDetailInterface | TVDetailInterface;

const isMovieDetail = (media: MediaDetail): media is MovieDetailInterface =>
	(media as MovieDetailInterface).title !== undefined || (media as MovieDetailInterface).original_title !== undefined;

const localeFor = (isEs: boolean) => (isEs ? 'es-MX' : 'en-US');

const mediaTitle = (media: MediaDetail) => (isMovieDetail(media) ? media.title : media.name) || '';

/** Four-digit year, or null when TMDB has no (or an unparseable) date. */
const mediaYear = (media: MediaDetail): number | null => {
	const raw = isMovieDetail(media) ? media.release_date : media.first_air_date;
	if (!raw) return null;
	const year = new Date(raw).getFullYear();
	return Number.isFinite(year) ? year : null;
};

/** "142 min" for movies, "45 min per episode" for series, null when unknown (TMDB often sends 0 or []). */
const runtimeLabel = (media: MediaDetail, isEs: boolean): string | null => {
	const minutes = isMovieDetail(media) ? media.runtime : media.episode_run_time?.[0];
	if (typeof minutes !== 'number' || minutes <= 0) return null;
	if (isMovieDetail(media)) return `${minutes} min`;
	return isEs ? `${minutes} min por episodio` : `${minutes} min per episode`;
};

const STATUS_LABELS: Record<string, [es: string, en: string]> = {
	Released: ['Estrenada', 'Released'],
	'Post Production': ['En posproducción', 'In post-production'],
	'In Production': ['En producción', 'In production'],
	Planned: ['Planeada', 'Planned'],
	Rumored: ['Rumoreada', 'Rumored'],
	Canceled: ['Cancelada', 'Canceled'],
	'Returning Series': ['En emisión', 'Returning series'],
	Ended: ['Finalizada', 'Ended'],
	Pilot: ['Piloto', 'Pilot'],
};

/** TMDB always sends status in English; unknown values pass through. */
const statusLabel = (status: string | undefined, isEs: boolean): string | null => {
	if (!status) return null;
	const labels = STATUS_LABELS[status];
	return labels ? labels[isEs ? 0 : 1] : status;
};

/** ISO 639-1 code to a language name in the page language ("en" → "inglés"). */
const languageName = (code: string | undefined, isEs: boolean, fallback?: string): string | null => {
	if (!code) return fallback || null;
	try {
		const name = new Intl.DisplayNames([localeFor(isEs)], { type: 'language' }).of(code);
		if (name && name !== code) return name.charAt(0).toLocaleUpperCase(localeFor(isEs)) + name.slice(1);
	} catch {
		// Unknown or malformed code: fall through.
	}
	return fallback || code.toUpperCase();
};

/** TMDB budget and revenue are US dollars. */
const formatMoney = (amount: number, isEs: boolean) =>
	new Intl.NumberFormat(localeFor(isEs), { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);

export { isMovieDetail, localeFor, mediaTitle, mediaYear, runtimeLabel, statusLabel, languageName, formatMoney };
export type { MediaDetail };
