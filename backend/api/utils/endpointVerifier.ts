import express, { Request, Response } from 'express';
import { LanguageISOCode } from '../routes/addons/types';
import { api_url } from '../routes';

function endpointVerifier(
	proxyPath: string,
	pathToGet: string,
	api_key: string | undefined,
	lang?: LanguageISOCode,
	includeAdult?: string,
	page?: string
): string {
	let url: string = '';

	const proxyCleanPath = proxyPath
		.split('?')[0]
		.replace(/^\/api/, '')
		.replace(/^\/+|\/+$/g, ''); // must be showed like, for example: movie/top_rated to match with the condition below.
	console.log(proxyCleanPath);

	if (pathToGet.includes(proxyCleanPath)) {
		url = `${api_url}/${proxyCleanPath}?api_key=${api_key}`;
		if (lang) url += `&language=${lang}`;
		if ((includeAdult && includeAdult === 'true') || includeAdult === 'false') {
			url += `&include_adult=${includeAdult}`;
		}
		if (page) url += `&page=${page}`;
	}

	if (!url) {
		console.error('ERROR: NO matching path');
	}

	return url;
}

export { endpointVerifier };
