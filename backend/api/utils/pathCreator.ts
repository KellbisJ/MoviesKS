import { api_url } from '../routes';
import { EndpointVerifierInterface } from './endpointVerifier';

function MoviesAndTvSeriesAllEndpoints(
	proxyPath: string,
	parameter: EndpointVerifierInterface,
	api_key: string | undefined
): string {
	const { paths, lang } = parameter;

	let url = '';

	const cleanPath = proxyPath
		.split('?')[0]
		.replace(/^\/api/, '')
		.replace(/^\/+|\/+$/g, ''); // must be showed like, for example: movie/top_rated to match with the condition below.

	if (paths.includes(cleanPath)) {
		url = `${api_url}/${cleanPath}?api_key=${api_key}&language=${lang}`;
	}

	return url;
}

export { MoviesAndTvSeriesAllEndpoints };
