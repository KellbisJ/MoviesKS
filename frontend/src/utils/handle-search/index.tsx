import { MediaTypeT } from '@/types/media-type';
import { NavigateFunction, useNavigate } from 'react-router-dom';

const handleSearch = (e: React.FormEvent, query: string, navigate: NavigateFunction) => {
	// const navigate = useNavigate();
	e.preventDefault();

	if (query.length > 0) {
		const sanitizedQuery = query.replace(/[^a-zA-Z0-9\s]/g, '').trim();
		navigate(`/search/about/${sanitizedQuery}`); // isn't allowed an empty search query
	}
};

const handleSearch2 = (
	e: React.FormEvent,
	query: string,
	mediaType: MediaTypeT.movie | MediaTypeT.tv,
	navigate: NavigateFunction
) => {
	// const navigate = useNavigate();
	e.preventDefault();

	if (query.length > 0) {
		const sanitizedQuery = query.replace(/[^a-zA-Z0-9\s]/g, '').trim();
		navigate(`/search/${mediaType}/${sanitizedQuery}`);
	}
};

export { handleSearch, handleSearch2 };
