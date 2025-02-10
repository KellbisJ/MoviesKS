import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMediaBySearch } from '../../services/media-by-search';
import { useInfiniteScroll } from '../../hooks/use-infinite-scroll';
import { CreateMedia } from '../../components/create-media';
import { MediaSkeleton } from '../../components/loading-skeletons';
import { useMenuContext } from '../../context/menu-context';
import { MovieInterface, TVInterface } from '../../types/movie-and-tv-interface';

const MediaBySearch = (): React.JSX.Element => {
	const { setShowMenuComponents } = useMenuContext();
  const { type, query } = useParams(); // To use type about media and query parameter from current URL

  const mediaType = type as string;
  const querySearch = query as string;


  useEffect(() => {
		setShowMenuComponents(false);
		return () => setShowMenuComponents(true);
  }, [setShowMenuComponents]);

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingComponents, setLoadingComponents] = useState<boolean>(true);
  
  const [media, setMedia] = useState<MovieInterface[] | TVInterface[]>([]);
  const [moreMedia, setMoreMedia] = useState<MovieInterface[] | TVInterface[]>([]);
  
	const [page, setPage] = useState<number>(1);
  const [canLoadMore, setCanLoadMore] = useState<boolean>(true);

  useEffect(() => {
    if (mediaType && querySearch) {
      window.scrollTo(0, 0);
      setLoadingComponents(true);
      setMedia([]);
      setMoreMedia([])
      setCanLoadMore(true)
    
		  async function fetchMedia() {
			  const mediaData = await getMediaBySearch(mediaType, querySearch, 1);
        setLoadingComponents(false);
        const mediaDataResults = mediaData.results
			  setMedia(mediaDataResults);
		  }
		  fetchMedia();
    }
		
  }, [mediaType, querySearch]);
  
  useEffect(() => {
    console.log(mediaType);
    console.log(querySearch);  
  }, [])

	const fetchMoreMedia = async () => {
		setLoading(true);
    const nextMedia = await getMediaBySearch(mediaType, querySearch, page);
    const nextMediaData = nextMedia.results;
    
    if (nextMediaData && nextMediaData.length > 0) {
      setMoreMedia((prevMedia) => {
        const mediaIds = new Set([...media, ...prevMedia].map((media) => media.id));
        const uniqueNextMedia = nextMediaData.filter((media): media is MovieInterface | TVInterface => !mediaIds.has(media.id));
        return [...prevMedia, ...uniqueNextMedia] as MovieInterface[] | TVInterface[]
      });
      setPage((prevPage) => prevPage + 1);
    } else {
      setCanLoadMore(false)
    }
		setLoading(false);
	};

  useInfiniteScroll({ callback: fetchMoreMedia, isLoading: loading, canLoadMore: canLoadMore });
  
  const allMedia = [...media, ...moreMedia] as MovieInterface[] | TVInterface[]


	if (media.length === 0) {
		return <h2 className="text-center dark:text-gray-100">No results</h2>;
	}

	return (
		<>
			{loadingComponents ? (
				<MediaSkeleton />
			) : (
				<>
					<h3 className="my-8 dark:text-gray-100">
						Search Results for "{querySearch}" in {mediaType === 'movies' ? 'Movies' : 'TV Shows'}
					</h3>
					<CreateMedia media={allMedia} type={mediaType} />
				</>
			)}
		</>
	);
}

export { MediaBySearch };
