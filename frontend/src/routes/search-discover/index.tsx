// pages/SearchDiscoverPage.tsx
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getMediaBySearch } from '@/services/media-by-search';
import { MediaBySearchInterface } from '@/types/media-by-search-interface';
import { CreateMedia } from '@/components/create-media';
import { MovieInterface, TVInterface } from '@/types/movie-and-tv-interface';
import { MediaSkeleton } from '@/components/loading-skeletons';

const SearchDiscoverPage = () => {
	const { type } = useParams();
	const [searchParams] = useSearchParams();
	const query = searchParams.get('query');

	const [loadingComponents, setLoadingComponents] = useState(true);

	const [results, setResults] = useState<MediaBySearchInterface>({ page: 1, results: [], total_pages: 0, total_results: 0 });

	useEffect(() => {
		const fetchData = async () => {
			if (!type || !query || (type !== 'movies' && type !== 'tv')) return;
			try {
				const data = await getMediaBySearch(type, query);
				setResults(data);
			} finally {
				setLoadingComponents(false);
			}
		};
		fetchData();
	}, [type, query]);

	if (type !== 'movies' && type !== 'tv') return <div>Invalid media type</div>;

	return (
		<>
			<h1 className="mb-8 text-gray-600 dark:text-gray-300">
				{type.charAt(0).toLocaleUpperCase() + type.slice(1)} results for "{query}"
			</h1>
			{loadingComponents ? <MediaSkeleton /> : <CreateMedia type={type} media={results.results} />}
		</>
	);
};

export { SearchDiscoverPage };
