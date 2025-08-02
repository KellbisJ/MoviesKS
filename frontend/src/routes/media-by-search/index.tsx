import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useValidMediaType } from '@/hooks/use-valid-media-type';
import { getMediaBySearch } from '../../services/media-by-search';
import { useInfiniteScroll } from '../../hooks/use-infinite-scroll';
import { CreateMedia } from '../../components/specific/create-media';
import { MovieInterface, TVInterface } from '../../types/movie-and-tv-interface';
import { NoResults } from '@/components/layout/no-results';
import { MediaTypeT } from '@/types/media-type';
import { PopcornParticlesLoader } from '@/components/utilities/loaders-animation';
import { isSpanishLang } from '@/utils/is-spanish-lang';
import { useLanguages } from '@/context/lang';

const MediaBySearch = (): React.JSX.Element => {
	const { language } = useLanguages();
	const { query } = useParams();

	const mediaType = useValidMediaType();
	const querySearch = query || '';

	const [loadingComponents, setLoadingComponents] = useState<boolean>(true);
	const [loading, setLoading] = useState<boolean>(false);

	const [media, setMedia] = useState<MovieInterface[] | TVInterface[]>([]);
	const [moreMedia, setMoreMedia] = useState<MovieInterface[] | TVInterface[]>([]);
	const [searchWasMade, setSearchWasMade] = useState<boolean>(false);

	const [page, setPage] = useState<number>(1);
	const [canLoadMore, setCanLoadMore] = useState<boolean>(true);

	useEffect(() => {
		setSearchWasMade(false);
		if (mediaType && querySearch) {
			window.scrollTo(0, 0);
			setMedia([]);
			setMoreMedia([]);
			setCanLoadMore(true);

			async function fetchMedia() {
				const mediaData = await getMediaBySearch(mediaType as MediaTypeT, querySearch, 1);
				const mediaDataResults = mediaData.results;
				setMedia(mediaDataResults);
				setSearchWasMade(true);
				setLoadingComponents(false);
			}
			fetchMedia();
		}
	}, [mediaType, querySearch]);

	// useEffect(() => {
	//   console.log(mediaType);
	//   console.log(querySearch);
	// }, [])

	const fetchMoreMedia = async () => {
		setLoading(true);
		const nextMedia = await getMediaBySearch(mediaType as MediaTypeT, querySearch, page);
		const nextMediaData = nextMedia.results;

		if (nextMediaData && nextMediaData.length > 0) {
			setMoreMedia((prevMedia) => {
				const mediaIds = new Set([...media, ...prevMedia].map((media) => media.id));
				const uniqueNextMedia = nextMediaData.filter(
					(media): media is MovieInterface | TVInterface => !mediaIds.has(media.id)
				);
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
			{loadingComponents && media.length === 0 && <PopcornParticlesLoader />}

			<h3 className="mb-8 dark:text-gray-100 p-3">
				{mediaType === MediaTypeT.movie
					? isSpanishLang(language)
						? `Resultados de búsqueda de "${querySearch}" en Películas`
						: `Search results for "${querySearch}" in Movies`
					: mediaType === MediaTypeT.tv
					? isSpanishLang(language)
						? `Resultados de búsqueda de "${querySearch}" en Series de TV`
						: `Search results for "${querySearch}" in TV Series`
					: 'MOCO VERDE'}
			</h3>
			<CreateMedia media={allMedia} type={mediaType} containerType="Normal" />

			{searchWasMade && media.length === 0 && <NoResults />}
		</>
	);
};

export { MediaBySearch };
