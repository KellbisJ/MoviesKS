import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMediaBySearch } from "@/services/media-by-search";
import { MediaBySearchInterface } from "@/services/media-by-search/types";
import { PopcornParticlesLoader } from "@/components/utilities/loaders-animation";
import { Film, Tv } from "lucide-react";
import { CreateMedia } from "@/components/specific/create-media";
import { NoResults } from "@/components/layout/no-results";
import { MediaTypeT } from "@/types/media-type";
import { isSpanishLang } from "@/utils/is-spanish-lang";
import { useLanguages } from "@/context/lang";

const SearchAboutPage = () => {
  const { language } = useLanguages();
  const { query } = useParams();

  const [loadingComponents, setLoadingComponents] = useState(true);

  const [movies, setMovies] = useState<MediaBySearchInterface>({
    page: 1,
    results: [],
    total_pages: 0,
    total_results: 0,
  });
  const [tv, setTv] = useState<MediaBySearchInterface>({
    page: 1,
    results: [],
    total_pages: 0,
    total_results: 0,
  });
  const [searchWasMade, setSearchWasMade] = useState<boolean>(false);

  useEffect(() => {
    setSearchWasMade(false);
    const fetchAllSearches = async () => {
      if (!query) return;
      try {
        const [moviesData, tvData] = await Promise.all([
          getMediaBySearch(MediaTypeT.movie, query),
          getMediaBySearch(MediaTypeT.tv, query),
        ]);
        setMovies(moviesData);
        setTv(tvData);
        setSearchWasMade(true);
      } finally {
        setLoadingComponents(false);
      }
    };
    fetchAllSearches();
  }, [query]);

  const limitResultsMediaToShow = 6;
  const limitedMovies = movies.results.slice(0, limitResultsMediaToShow);
  const limitedTv = tv.results.slice(0, limitResultsMediaToShow);

  return (
    <>
      {loadingComponents ? (
        <>
          <PopcornParticlesLoader />
        </>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-text-low dark:text-dark-text-low my-4">
            {isSpanishLang(language)
              ? `Resultados para "${query}"`
              : `Results for "${query}"`}
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 w-auto">
            {[
              {
                to: `/search/discover/${MediaTypeT.movie}?query=${query}`,
                label: isSpanishLang(language)
                  ? `Películas  (${movies.results.length})`
                  : `Movies  (${movies.results.length})`,
                icon: Film,
              },
              {
                to: `/search/discover/${MediaTypeT.tv}?query=${query}`,
                label: isSpanishLang(language)
                  ? `Series de Tv  (${tv.results.length})`
                  : `TV Series  (${tv.results.length})`,
                icon: Tv,
              },
            ].map((item, index) => (
              <Link
                key={`${item.to}-${index}`}
                to={item.to}
                className="flex flex-col items-start p-4 bg-surface-2 dark:bg-dark-surface-2 text-text-low dark:text-dark-text-low hover:text-accent dark:hover:text-dark-accent transition-colors rounded-lg min-w-40">
                <div className="flex items-start gap-2">
                  <item.icon size={14} />
                  <span className="leading-none">{item.label}</span>
                </div>
              </Link>
            ))}
          </div>

          {movies.results.length > 0 && (
            <div className="mt-8">
              <h3 className="text-text-low dark:text-dark-text-low mb-4 p-3 bg-surface-1 dark:bg-dark-surface-1 rounded-t-lg">
                {isSpanishLang(language)
                  ? "Acerca de las películas"
                  : "About Movies"}
              </h3>
              <CreateMedia type={MediaTypeT.movie} media={limitedMovies} />
            </div>
          )}

          {tv.results.length > 0 && (
            <div className="mt-8">
              <h3 className="text-text-low dark:text-dark-text-low mb-4 p-3 bg-surface-1 dark:bg-dark-surface-1 rounded-t-lg">
                {isSpanishLang(language)
                  ? "Acerca de series de televisión"
                  : "About Tv Series"}
              </h3>
              <CreateMedia type={MediaTypeT.tv} media={limitedTv} />
            </div>
          )}

          {searchWasMade &&
            movies.results.length === 0 &&
            tv.results.length === 0 && (
              <div className="mt-4 sm:mt-20">
                <NoResults />
              </div>
            )}
        </div>
      )}
    </>
  );
};

export { SearchAboutPage };
