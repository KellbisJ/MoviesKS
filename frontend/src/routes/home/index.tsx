import { useCallback, useEffect, useState, useMemo } from "react";
import { getMediaLists } from "@/services/media-lists";
import {
  ListTypeMovies,
  ListTypeTvSeries,
} from "@/services/media-lists/types";
import { HomeViewContent } from "./HomeViewContent";
import { MediaTypeT } from "@/types/media-type";
import { isSpanishLang } from "@/utils/is-spanish-lang";
import { useLanguages } from "@/context/lang";
import { MediaSectionData, SectionMedia } from "./types";

type SectionKey = "popularMovies" | "popularTv" | "topRatedMovies" | "topRatedTv";

interface SectionResult {
  media: SectionMedia;
  failed: boolean;
}

const EMPTY_RESULT: SectionResult = { media: [], failed: false };

const Home = (): React.JSX.Element => {
  const { language } = useLanguages();
  const isEs = isSpanishLang(language);

  const [isLoadingMedia, setIsLoadingMedia] = useState<boolean>(true);
  const [attempt, setAttempt] = useState<number>(0);
  const [results, setResults] = useState<Record<SectionKey, SectionResult>>({
    popularMovies: EMPTY_RESULT,
    popularTv: EMPTY_RESULT,
    topRatedMovies: EMPTY_RESULT,
    topRatedTv: EMPTY_RESULT,
  });

  useEffect(() => {
    let cancelled = false;

    const fetchHomeLists = async () => {
      setIsLoadingMedia(true);

      // allSettled: one failing list must not take the other three down with it.
      const [popularMovies, topRatedMovies, topRatedTv, popularTv] =
        await Promise.allSettled([
          getMediaLists(1, MediaTypeT.movie, ListTypeMovies.popular),
          getMediaLists(1, MediaTypeT.movie, ListTypeMovies.topRated),
          getMediaLists(1, MediaTypeT.tv, ListTypeTvSeries.topRated),
          getMediaLists(1, MediaTypeT.tv, ListTypeTvSeries.popular),
        ]);

      if (cancelled) return;

      const toResult = (
        settled: PromiseSettledResult<{ results: unknown[] }>
      ): SectionResult => {
        if (settled.status === "fulfilled") {
          return { media: settled.value.results as SectionMedia, failed: false };
        }
        console.error(settled.reason);
        return { media: [], failed: true };
      };

      setResults({
        popularMovies: toResult(popularMovies),
        popularTv: toResult(popularTv),
        topRatedMovies: toResult(topRatedMovies),
        topRatedTv: toResult(topRatedTv),
      });
      setIsLoadingMedia(false);
    };

    fetchHomeLists();

    return () => {
      cancelled = true;
    };
  }, [attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  const mediaSectionData = useMemo<MediaSectionData[]>(
    () => [
      {
        id: "popular-movies",
        title: isEs ? "Películas populares" : "Popular movies",
        type: MediaTypeT.movie,
        ...results.popularMovies,
      },
      {
        id: "popular-tv",
        title: isEs ? "Series populares" : "Popular TV series",
        type: MediaTypeT.tv,
        ...results.popularTv,
      },
      {
        id: "top-rated-movies",
        title: isEs ? "Películas mejor valoradas" : "Top-rated movies",
        type: MediaTypeT.movie,
        ...results.topRatedMovies,
      },
      {
        id: "top-rated-tv",
        title: isEs ? "Series mejor valoradas" : "Top-rated TV series",
        type: MediaTypeT.tv,
        ...results.topRatedTv,
      },
    ],
    [isEs, results]
  );

  return (
    <HomeViewContent
      isLoadingMedia={isLoadingMedia}
      mediaSectionData={mediaSectionData}
      onRetry={retry}
    />
  );
};

export { Home };
