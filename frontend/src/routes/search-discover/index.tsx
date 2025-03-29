// pages/SearchDiscoverPage.tsx
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useValidMediaType } from '@/hooks/use-valid-media-type';
import { getMediaBySearch } from '@/services/media-by-search';
import { MediaBySearchInterface } from '@/services/media-by-search/types';
import { CreateMedia } from '@/components/create-media';
import { NoResults } from '@/components/no-results';
import { MediaTypeT } from '@/types/media-type';
import { PopcornParticlesLoader } from '@/components/loaders-animation';

const SearchDiscoverPage = () => {
	const [searchParams] = useSearchParams();
	const query = searchParams.get('query') as string;

	const mediaType = useValidMediaType();

	// if (!query) {
	// 	console.error('Querryyy errror');
	// }

	const [loadingComponents, setLoadingComponents] = useState(true);
	const [searchWasMade, setSearchWasMade] = useState<boolean>(false);

	const [media, setMedia] = useState<MediaBySearchInterface>({ page: 1, results: [], total_pages: 0, total_results: 0 });

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getMediaBySearch(mediaType, query);
				setMedia(data);
			} finally {
				setLoadingComponents(false);
				setSearchWasMade(true);
			}
		};
		fetchData();
	}, [mediaType, query]);

	return (
		<>
			{loadingComponents && media.results.length === 0 && <PopcornParticlesLoader />}

			{media.results.length > 0 && (
				<>
					<h1 className="mb-8 text-gray-600 dark:text-gray-300">
						{mediaType.charAt(0).toLocaleUpperCase() + mediaType.slice(1)} results for "{query}"
					</h1>
					<CreateMedia type={mediaType} media={media.results} />
				</>
			)}

			{searchWasMade && media.results.length === 0 && (
				<div className="mt-4 sm:mt-20">
					<NoResults />

					<p className="text-lg text-center text-gray-500">
						Vuelve al{' '}
						<a href="/home" className="text-cyan-500 hover:underline">
							homepage
						</a>
						.
					</p>
				</div>
			)}
		</>
	);
};

export { SearchDiscoverPage };
