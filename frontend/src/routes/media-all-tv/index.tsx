import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getPreviewTrendingMedia } from '../../services/preview-trending-media';
import { CreateMedia } from '../../components/create-media';
import { useMenuContext } from '../../context/menu-context';
import { useInfiniteScroll } from '../../hooks/use-infinite-scroll';
import { MediaSkeleton } from '../../components/loading-skeletons';
import { TVInterface } from '@/types/movie-and-tv-interface';

const MediaAllTV = (): React.JSX.Element => {
  const { setShowMenuComponents } = useMenuContext();

  useEffect(() => {
    setShowMenuComponents(false);
    return () => setShowMenuComponents(true);
  }, [setShowMenuComponents]);

  const location = useLocation();

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingComponents, setLoadingComponents] = useState<boolean>(true);
  const [tv, setTv] = useState<TVInterface[]>([]);
  const [moreMediaTv, setMoreMediaTv] = useState<TVInterface[]>([]);

  const [page, setPage] = useState<number>(2);

  const [canLoadMore, setCanLoadMore] = useState<boolean>(true);
  const [prevPath, setPrevPath] = useState<string>('');

  const mediaType: string = 'tv';

  useEffect(() => {
    if (location.pathname === '/tv/all') {
      setLoadingComponents(true);
      setTv([]);
      setMoreMediaTv([]);
      setCanLoadMore(true);
      window.scrollTo(0, 0);

      async function fetchMedia() {
        const previewTV = await getPreviewTrendingMedia(mediaType);
        const tvData = previewTV.results;
        setLoadingComponents(false);
        setTv(tvData as TVInterface[]);
      }

      fetchMedia();
    }
  }, [location]);

  useEffect(() => {
    if (location.pathname === '/tv/all' && prevPath !== '/tv/all') {
      window.scrollTo(0, 0);
      setPrevPath('/tv/all');
    }
  }, [location, prevPath]);

  const fetchMoreTvMedia = async () => {
    setLoading(true);
    const nextTvMedia = await getPreviewTrendingMedia(mediaType, page);
    const nextTvMediaData = nextTvMedia.results;

    if (nextTvMediaData && nextTvMediaData.length > 0) {
      setMoreMediaTv((prevTvMedia) => {
        const tvMediaIds = new Set([...tv, ...prevTvMedia].map((tv) => tv.id));
        const uniqueNextTv = nextTvMediaData.filter((tv): tv is TVInterface => !tvMediaIds.has(tv.id));
        return [...prevTvMedia, ...uniqueNextTv];
      });
      setPage((prevPage) => prevPage + 1);
    } else {
      setCanLoadMore(false);
    }
    setLoading(false);
  };

  useInfiniteScroll({ callback: fetchMoreTvMedia, isLoading: loading, canLoadMore: canLoadMore });

  const allTv = [...tv, ...moreMediaTv];

  return <>{loadingComponents ? <MediaSkeleton /> : <CreateMedia media={allTv} type="tv" />}</>;
};

export { MediaAllTV };