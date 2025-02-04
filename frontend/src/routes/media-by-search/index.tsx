import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMediaBySearch } from '../../services/media-by-search';
import { useInfiniteScroll } from '../../hooks/use-infinite-scroll';
import { CreateMedia } from '../../components/create-media';
import { MediaSkeleton } from '../../components/loading-skeletons';
import { useMenuContext } from '../../context/menu-context';
import { MovieInterface, TVInterface } from '../../types/movie-and-tv-interface';
import { MediaBySearchInterface } from '../../types/media-by-search-interface';

function MediaBySearch() {
	const { setShowMenuComponents } = useMenuContext();

	useEffect(() => {
		setShowMenuComponents(false);
		return () => setShowMenuComponents(true);
  }, [setShowMenuComponents]);
  
  const { type, query } = useParams();
  
  const [media, setMedia] = useState<MediaBySearchInterface>({ page: 1, results: [], total_pages: 0, total_results: 0 });
  
  const [mediaType, setMediaType] = useState<string>('')
  const [querySearch, setQuerySearch] = useState<string>('')

	const [loadingComponents, setLoadingComponents] = useState(true);

	const [moreMedia, setMoreMedia] = useState<(MovieInterface | TVInterface)[]>([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const canLoadMore = media.page < media.total_pages;

	useEffect(() => {
		window.scrollTo(0, 0);
		setMedia({ page: 1, results: [], total_pages: 0, total_results: 0 });
    setLoadingComponents(true);
    
    if (type) {
      setMediaType(type)
    }
    
    if (query) {
      setQuerySearch(query)
    }

		async function fetchMedia() {
			const mediaData = await getMediaBySearch(mediaType, querySearch, 1);
			setLoadingComponents(false);
			setMedia(mediaData);
		}
		fetchMedia();
	}, [type, query]);

	const fetchMoreMedia = async () => {
		setLoading(true);
		const nextMedia = await getMediaBySearch(mediaType, querySearch, media.page + 1);
		setMedia((prevMedia) => ({
			...prevMedia,
			page: nextMedia.page,
			results: [...prevMedia.results, ...nextMedia.results],
			total_pages: nextMedia.total_pages,
			total_results: nextMedia.total_results,
		}));
		setLoading(false);
	};

	useInfiniteScroll(fetchMoreMedia, loading, canLoadMore);



	if (media.results.length === 0) {
		return <h2 className="text-center dark:text-gray-100">No results</h2>;
	}

	return (
		<>
			{loadingComponents ? (
				<MediaSkeleton />
			) : (
				<>
					<h3 className="my-8 dark:text-gray-100">
						Search Results for "{query}" in {type === 'movies' ? 'Movies' : 'TV Shows'}
					</h3>
					<CreateMedia media={media.results} type={mediaType} />
				</>
			)}
		</>
	);
}

export { MediaBySearch };
