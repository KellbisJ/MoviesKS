// pages/SearchDiscoverPage.tsx
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getMediaBySearch } from '@/services/media-by-search';
import { MediaBySearchInterface } from '@/types/media-by-search-interface';
import { CreateMedia } from '@/components/create-media';
import { MediaSkeleton } from '@/components/loading-skeletons';
import { NoResults } from '@/components/no-results';

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
			{results.results.length === 0 && (
				<>
					<NoResults />
					<p className="text-lg text-center text-gray-500">
						Vuelve al{' '}
						<a href="/home" className="text-cyan-500 hover:underline">
							homepage
						</a>
						.
					</p>
				</>
			)}

			{results.results.length > 0 && (
				<>
					<h1 className="mb-8 text-gray-600 dark:text-gray-300">
						{type.charAt(0).toLocaleUpperCase() + type.slice(1)} results for "{query}"
					</h1>
					{loadingComponents ? <MediaSkeleton /> : <CreateMedia type={type} media={results.results} />}
				</>
			)}
		</>
	);
};

export { SearchDiscoverPage };
