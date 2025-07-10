import { LanguageISOCode } from '../routes/configurations/languages/types';
import { EndpointSection } from '../routes';
import { endpointsMoviesAndTvAll } from '../routes/movies-and-tvseries';
import { MoviesAndTvSeriesAllEndpoints } from './pathCreator';

interface EndpointVerifierInterface {
	endpoint: string[];
	mediaTypeRequired: boolean;
	idRequired: boolean;
	mediaType?: string;
	mediaId?: string;
	lang?: LanguageISOCode;
}

function endpointVerifier(
	proxyPath: string,
	endpointSection: EndpointSection | EndpointSection[],
	endpointParams: EndpointVerifierInterface[],
	api_key: string | undefined
): string {
	let url: string = '';

	for (const parameter of endpointParams) {
		switch (endpointSection) {
			case endpointsMoviesAndTvAll:
				url = MoviesAndTvSeriesAllEndpoints(proxyPath, parameter, api_key);
				break;
			default:
				console.error('No path sended or found.');
		}
		if (url) break;
	}

	if (!url) {
		console.error('ERROR: NO matching path');
	}

	return url;
}

export { endpointVerifier, EndpointVerifierInterface };
