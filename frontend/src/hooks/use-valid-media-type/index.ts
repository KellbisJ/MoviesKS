import { useParams, useLocation } from 'react-router-dom';
import { getValidMediaType, mediaTypeFromPath } from '@/utils/media-type-validation';
import { MediaTypeT } from '@/types/media-type';

const useValidMediaType = (): MediaTypeT => {
	const { type } = useParams();
	const location = useLocation();

	// `:type` routes (detail) name it; static routes carry it as a segment: /tv, /search/tv/:query.
	return type ? getValidMediaType(type) : mediaTypeFromPath(location.pathname);
};

export { useValidMediaType };
