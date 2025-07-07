import { LanguageISOCode } from '../routes/configurations/languages/types';

interface endpointVerifierInterface {
	endpoints: {
		endpoint: string;
		mediaTypeRequired: boolean;
		idRequired: boolean;
		mediaType?: string;
		mediaId?: string;
		lang?: LanguageISOCode;
	}[];
}

function endpointVerifier(
	proxyPath: string,
	api_url: string,
	config: endpointVerifierInterface,
	api_key: string | undefined
): string {
	let url: string = '';

	for (const parameter of config.endpoints) {
		if (parameter.idRequired && parameter.mediaTypeRequired) {
			const expectedPath = `/${parameter.mediaType}/${parameter.mediaId}/${parameter.endpoint}`;
			if (proxyPath.includes(expectedPath)) {
				url = `${api_url}/${parameter.mediaType}/${parameter.mediaId}/${parameter.endpoint}?api_key=${api_key}&language=${parameter.lang}`;
				// MediaType based endpoint
				break;
			}
		} else if (!parameter.mediaTypeRequired && parameter.idRequired) {
			const expectedPath = `/${parameter.endpoint}/${parameter.mediaId}`;
			if (proxyPath.includes(expectedPath)) {
				url = `${api_url}/${parameter.endpoint}/${parameter.mediaId}?api_key=${api_key}&language=${parameter.lang}`;
				// Simple endpoint
				break;
			}
		}
	}

	if (!url) {
		console.error('ERROR: NO matching path');
	}

	return url;
}

export { endpointVerifier };
