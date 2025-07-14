import { LanguageISOCode } from '../routes/addons/types';
import { api_url, EndpointSection } from '../routes';

interface EndpointVerifierInterface {
	paths: string[];
	lang?: LanguageISOCode;
}

function endpointVerifier(
	proxyPath: string,
	endpointParams: EndpointVerifierInterface[],
	api_key: string | undefined
): string {
	let url: string = '';

	const cleanPath = proxyPath
		.split('?')[0]
		.replace(/^\/api/, '')
		.replace(/^\/+|\/+$/g, ''); // must be showed like, for example: movie/top_rated to match with the condition below.
	console.log(cleanPath);

	for (const parameter of endpointParams) {
		const { paths, lang } = parameter;
		if (paths.includes(cleanPath)) {
			url = `${api_url}/${cleanPath}?api_key=${api_key}&language=${lang}`;
			break;
		}
		if (url) break;
	}

	if (!url) {
		console.error('ERROR: NO matching path');
	}

	return url;
}

export { endpointVerifier, EndpointVerifierInterface };
