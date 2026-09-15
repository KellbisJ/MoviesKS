import express, { Request, Response } from 'express';
import { LanguageISOCode } from '../routes/addons/types';
import { api_url } from '../routes';

/**
 * Extra TMDB `discover/*` params the browse page may send. Each key has a
 * strict value pattern; anything that fails it is dropped, never forwarded.
 */
const DISCOVER_PARAM_PATTERNS = {
	sort_by: /^(popularity|vote_average|primary_release_date|first_air_date)\.(asc|desc)$/,
	primary_release_year: /^\d{4}$/,
	first_air_date_year: /^\d{4}$/,
	'vote_count.gte': /^\d{1,6}$/,
	'primary_release_date.lte': /^\d{4}-\d{2}-\d{2}$/,
	'first_air_date.lte': /^\d{4}-\d{2}-\d{2}$/,
} as const;

type DiscoverParamKey = keyof typeof DISCOVER_PARAM_PATTERNS;
type DiscoverParams = Partial<Record<DiscoverParamKey, unknown>>;

const DISCOVER_PARAM_KEYS = Object.keys(DISCOVER_PARAM_PATTERNS) as DiscoverParamKey[];

function endpointVerifier(
	proxyPath: string,
	pathToGet: string,
	api_key: string | undefined,
	pageLanguageCustomHeader?: LanguageISOCode,
	page?: string,
	query?: string,
	with_genres?: string,
	language?: string,
	discoverParams?: DiscoverParams
): string {
	let url: string = '';

	const proxyCleanPath = proxyPath
		.split('?')[0]
		.replace(/^\/api/, '')
		.replace(/^\/+|\/+$/g, ''); // must be showed like, for example: movie/top_rated to match with the condition below.
	// console.log(proxyCleanPath);

	if (pathToGet.includes(proxyCleanPath)) {
		url = `${api_url}/${proxyCleanPath}?api_key=${api_key}&include_adult=false`;

		if (pageLanguageCustomHeader) {
			if (!pathToGet.includes('/images') && !pathToGet.includes('/reviews')) {
				url += `&language=${pageLanguageCustomHeader}`;
			}
		}

		if (page) url += `&page=${page}`;

		if (query) url += `&query=${query}`;

		// Genre ids joined by "," (AND) or "|" (OR); reject anything else so it can't smuggle extra params.
		if (with_genres && /^\d+([,|]\d+)*$/.test(with_genres)) url += `&with_genres=${with_genres}`;

		if (language) url += `&language=${language}`;

		// Sort/year/vote filters only make sense on discover endpoints.
		if (discoverParams && proxyCleanPath.startsWith('discover/')) {
			for (const key of DISCOVER_PARAM_KEYS) {
				const value = discoverParams[key];
				if (typeof value === 'string' && DISCOVER_PARAM_PATTERNS[key].test(value)) {
					url += `&${key}=${encodeURIComponent(value)}`;
				}
			}
		}
	}

	if (!url) {
		console.error('ERROR: NO matching path');
	}

	// console.log('urlss', url);

	return url;
}

export { endpointVerifier };
