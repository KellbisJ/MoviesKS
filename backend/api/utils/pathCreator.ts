import { api_url } from '../routes';
import { EndpointVerifierInterface } from './endpointVerifier';

function MoviesAndTvSeriesAllEndpoints(
	proxyPath: string,
	parameter: EndpointVerifierInterface,
	api_key: string | undefined
): string {
	const { endpoint, mediaTypeRequired, idRequired, mediaType, mediaId, lang } = parameter;

	const notMediaDetailsEndpointArr = endpoint.filter((val) => val !== 'movie' && val !== 'tv');

	const endpointMatched = notMediaDetailsEndpointArr.find((val) => proxyPath.includes(`/${val}`));

	console.log(notMediaDetailsEndpointArr);
	console.log(endpointMatched);

	const notMediaDetails = endpointMatched !== undefined;

	console.log(notMediaDetails);

	let url = '';

	for (const ep of endpoint) {
		if (notMediaDetails && mediaTypeRequired && idRequired) {
			url = `${api_url}/${mediaType}/${mediaId}/${endpointMatched}?api_key=${api_key}&language=${lang}`;
			// Associated with TV SERIES and MOVIES section, but dynamic endpoints
			break;
		} else if (!notMediaDetails && mediaTypeRequired && idRequired) {
			url = `${api_url}/${mediaType}/${mediaId}?api_key=${api_key}&language=${lang}`;
			// Associated with TV SERIES and MOVIES section, only media details endpoints
			break;
		} else if (notMediaDetails && mediaTypeRequired && !idRequired) {
			url = `${api_url}/${mediaType}/${endpointMatched}?api_key=${api_key}&language=${lang}`;
			// Associated with MOVIE LISTS and TV SERIES LISTS endpoints
			break;
		}
		if (url) break;
	}

	return url;
}

export { MoviesAndTvSeriesAllEndpoints };
