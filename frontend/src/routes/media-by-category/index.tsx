import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMenuContext } from '../../context/menu-context';
import { useInfiniteScroll } from '../../hooks/use-infinite-scroll';
import { getMediaByCategory } from '../../services/media-by-category';
import { CreateMedia } from '../../components/create-media';
import { MediaSkeleton } from '../../components/loading-skeletons';
import { MovieInterface, TVInterface } from '../../types/movie-and-tv-interface';

const MediaByCategory = (): React.JSX.Element => {
  const { setShowMenuComponents } = useMenuContext();
  const { type, id: genreId } = useParams<{ type: string; id: string }>();

  const mediaType = type as string;
  const mediaGenreId = genreId as string;

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
    if (mediaType && mediaGenreId) {
      window.scrollTo(0, 0);
      setLoadingComponents(true);
      setMedia([]);
      setMoreMedia([]);
      setCanLoadMore(true);

      async function fetchMedia() {
        const mediaData = await getMediaByCategory(mediaType, mediaGenreId);
        const mediaDataResults = mediaData.results;
        setLoadingComponents(false);
        setMedia(mediaDataResults);
        setCanLoadMore(true);
      }
      fetchMedia();
    }
  }, [mediaType, mediaGenreId]);

  const fetchMoreMedia = async () => {
    setLoading(true);
    const nextMedia = await getMediaByCategory(mediaType, mediaGenreId, page);
    const nextMediaData = nextMedia.results;

    if (nextMediaData && nextMediaData.length > 0) {
      setMoreMedia((prevMedia) => {
        const mediaIds = new Set([...media, ...prevMedia].map((media) => media.id));
        const uniqueNextMedia = nextMediaData.filter((media): media is MovieInterface | TVInterface => !mediaIds.has(media.id));
        return [...prevMedia, ...uniqueNextMedia] as MovieInterface[] | TVInterface[];
      });
      setPage((prevPage) => prevPage + 1);
    } else {
      setCanLoadMore(false);
    }
    setLoading(false);
  };

  useInfiniteScroll({ callback: fetchMoreMedia, isLoading: loading, canLoadMore: canLoadMore });

  const allMedia = [...media, ...moreMedia] as MovieInterface[] | TVInterface[];

  return (
    <>
      {loadingComponents ? (
        <>
          <h2 className="my-8 dark:text-gray-100">Loading...</h2>
          <MediaSkeleton />
        </>
      ) : (
        <>
          <h2 className="my-8 dark:text-gray-100">All Media by Category: {mediaType}</h2>
          <CreateMedia media={allMedia} type={mediaType} />
        </>
      )}
    </>
  );
};

export { MediaByCategory };