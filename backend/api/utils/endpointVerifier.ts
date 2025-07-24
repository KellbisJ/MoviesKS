import express, { Request, Response } from 'express';
import { LanguageISOCode } from '../routes/addons/types';
import { api_url } from '../routes';

function endpointVerifier(
	proxyPath: string,
	pathToGet: string,
	api_key: string | undefined,
	lang?: LanguageISOCode,
	page?: string,
	query?: string,
	with_genres?: string
): string {
	let url: string = '';

	const proxyCleanPath = proxyPath
		.split('?')[0]
		.replace(/^\/api/, '')
		.replace(/^\/+|\/+$/g, ''); // must be showed like, for example: movie/top_rated to match with the condition below.
	// console.log(proxyCleanPath);

	if (pathToGet.includes(proxyCleanPath)) {
		url = `${api_url}/${proxyCleanPath}?api_key=${api_key}&include_adult=false`;

		if (lang) url += `&language=${lang}`;

		if (page) url += `&page=${page}`;

		if (query) url += `&query=${query}`;

		if (with_genres) url += `&with_genres=${with_genres}`;
	}

	if (!url) {
		console.error('ERROR: NO matching path');
	}

	// console.log('urlss', url);

	return url;
}

export { endpointVerifier };
