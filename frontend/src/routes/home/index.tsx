import { useEffect, useState, useMemo } from "react";
import { MovieInterface, TVInterface } from "@/types/movie-and-tv-interface";
import { getMediaLists } from "@/services/media-lists";
import {
  MoviesListInterface,
  TvSeriesListInterface,
  ListTypeMovies,
  ListTypeTvSeries,
} from "@/services/media-lists/types";
import { HomeViewContent } from "./HomeViewContent";
import { MediaTypeT } from "@/types/media-type";
import { isSpanishLang } from "@/utils/is-spanish-lang";
import { useLanguages } from "@/context/lang";

const Home = (): React.JSX.Element => {
  const { language } = useLanguages();

  const [isLoadingComponents, setIsLoadingComponents] = useState<boolean>(true);
  const [isLoadingMedia, setIsLoadingMedia] = useState<boolean>(true);
  const [isErrorCatched, setIsErrorCatched] = useState<boolean>(false);
  const [movieMediaPopularList, setMovieMediaPopularList] = useState<
    MoviesListInterface[]
  >([]);
  const [movieMediaTopRatedList, setMovieMediaTopRatedList] = useState<
    MoviesListInterface[]
  >([]);
  const [tvSeriesMediaPopularList, setTvSeriesMediaPopularList] = useState<
    TvSeriesListInterface[]
  >([]);
  const [tvSeriesMediaTopRatedList, setTvSeriesMediaTopRatedList] = useState<
    TvSeriesListInterface[]
  >([]);

  useEffect(() => {
    const fetchPopularMediaList: () => Promise<void> = async () => {
      try {
        setIsErrorCatched(false);
        const [
          popularMoviesList,
          topRatedMoviesList,
          topRatedTvSeriesList,
          popularTvSeriesList,
        ] = await Promise.all([
          getMediaLists(1, MediaTypeT.movie, ListTypeMovies.popular),
          getMediaLists(1, MediaTypeT.movie, ListTypeMovies.topRated),
          getMediaLists(1, MediaTypeT.tv, ListTypeTvSeries.topRated),
          getMediaLists(1, MediaTypeT.tv, ListTypeTvSeries.popular),
        ]);

        setMovieMediaPopularList(popularMoviesList.results);
        setMovieMediaTopRatedList(topRatedMoviesList.results);
        setTvSeriesMediaPopularList(popularTvSeriesList.results);
        setTvSeriesMediaTopRatedList(topRatedTvSeriesList.results);
      } catch (err) {
        setIsLoadingComponents(false);
        setIsLoadingMedia(false);
        setIsErrorCatched(true);
        console.error(err);
      } finally {
        setIsLoadingMedia(false);
      }
    };

    fetchPopularMediaList();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoadingComponents(false), 300);
    return () => clearTimeout(timeout);
  }, []);

  const mediaSectionData = useMemo(
    () => [
      {
        title: isSpanishLang(language)
          ? "Películas populares recientes"
          : "Recent popular movies",
        type: MediaTypeT.movie,
        media: movieMediaPopularList as MovieInterface[],
      },
      {
        title: isSpanishLang(language)
          ? "Series de televisión populares recientes"
          : "Recent Popular TV Series",
        type: MediaTypeT.tv,
        media: tvSeriesMediaPopularList as TVInterface[],
      },
      {
        title: isSpanishLang(language)
          ? "Películas mejor valoradas"
          : "Top-rated movies",
        type: MediaTypeT.movie,
        media: movieMediaTopRatedList as MovieInterface[],
      },
      {
        title: isSpanishLang(language)
          ? "Series de televisión mejor valoradas"
          : "Top-rated TV series",
        type: MediaTypeT.tv,
        media: tvSeriesMediaTopRatedList as TVInterface[],
      },
    ],
    [
      language,
      movieMediaPopularList,
      movieMediaTopRatedList,
      tvSeriesMediaPopularList,
      tvSeriesMediaTopRatedList,
    ]
  );

  return (
    <HomeViewContent
      isLoadingComponents={isLoadingComponents}
      isLoadingMedia={isLoadingMedia}
      isErrorCatched={isErrorCatched}
      mediaSectionData={mediaSectionData}
    />
  );
};

export { Home };
