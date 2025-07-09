import { LanguageISOCode } from '../routes/configurations/languages/types';
import { EndpointSection } from '../routes';
import { endpointsMoviesAndTvAll } from '../routes/movies-and-tvseries';

interface EndpointVerifierInterface {
	endpoint: string;
	mediaTypeRequired: boolean;
	idRequired: boolean;
	mediaType?: string;
	mediaId?: string;
	lang?: LanguageISOCode;
}

function endpointVerifier(
	proxyPath: string,
	endpointSection: EndpointSection | EndpointSection[],
	api_url: string,
	endpointParams: EndpointVerifierInterface[],
	api_key: string | undefined
): string {
	let url: string = '';

	for (const parameter of endpointParams) {
		switch (endpointSection) {
			case endpointsMoviesAndTvAll:
				if (parameter.idRequired && parameter.mediaTypeRequired) {
					const expectedPath = `/${parameter.mediaType}/${parameter.mediaId}/${parameter.endpoint}`;
					if (proxyPath.includes(expectedPath)) {
						url = `${api_url}/${parameter.mediaType}/${parameter.mediaId}/${parameter.endpoint}?api_key=${api_key}&language=${parameter.lang}`;
						// MediaType and other parameters based endpoint
						break;
					}
				} else if (!parameter.mediaTypeRequired && parameter.idRequired) {
					const expectedPath = `/${parameter.endpoint}/${parameter.mediaId}`;
					if (proxyPath.includes(expectedPath)) {
						url = `${api_url}/${parameter.endpoint}/${parameter.mediaId}?api_key=${api_key}&language=${parameter.lang}`;
						// Just mediatype endpoint
						break;
					}
				}
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
