import { useParams, useLocation } from 'react-router-dom';
import { getValidMediaType } from '@/utils/media-type-validation';
import { MediaTypeT } from '@/types/media-type';

const useValidMediaType = (): MediaTypeT => {
	const { type } = useParams();
	const location = useLocation();

	return getValidMediaType(type || location.pathname.split('/').filter(Boolean)[0]); // works for both, dynamics and statics routes
};

export { useValidMediaType }; // better
