import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { getMediaBySearch } from "@/services/media-by-search";
import { MediaBySearchInterface } from "@/services/media-by-search/types";
import { PopcornParticlesLoader } from "@/components/utilities/loaders-animation";
import { ArrowRight, Film, RotateCw, Tv } from "lucide-react";
import { CreateMedia } from "@/components/specific/create-media";
import { NoResults } from "@/components/layout/no-results";
import { MediaTypeT } from "@/types/media-type";
import { isSpanishLang } from "@/utils/is-spanish-lang";
import { useLanguages } from "@/context/lang";
import { LoadError } from "@/components/common/load-error";
import { countLabel } from "@/routes/filtered-media/browse-copy";
import { searchPath } from "@/routes/media-by-search/search-path";

/** One type's first page, or a failure for that type alone. */
type TypeResult = { data: MediaBySearchInterface; failed: false } | { data: null; failed: true };

interface AboutState {
  key: string;
  status: "loading" | "ready";
  movie: TypeResult | null;
  tv: TypeResult | null;
}

const PREVIEW_COUNT = 6;

const settle = (outcome: PromiseSettledResult<MediaBySearchInterface>): TypeResult =>
  outcome.status === "fulfilled"
    ? { data: outcome.value, failed: false }
    : { data: null, failed: true };

const SearchAboutPage = () => {
  const { language } = useLanguages();
  const isEs = isSpanishLang(language);
  const query = (useParams().query ?? "").trim();
  const key = `${query}|${language}`;

  const [state, setState] = useState<AboutState>({ key, status: "loading", movie: null, tv: null });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    // A new query or language starts from the loader; never show the previous search's posters.
    setState({ key, status: "loading", movie: null, tv: null });
    if (!query) return;

    // allSettled: one type failing must not hide the other type's results.
    Promise.allSettled([
      getMediaBySearch(MediaTypeT.movie, query),
      getMediaBySearch(MediaTypeT.tv, query),
    ]).then(([movie, tv]) => {
      if (cancelled) return;
      setState({ key, status: "ready", movie: settle(movie), tv: settle(tv) });
    });

    return () => {
      cancelled = true;
    };
  }, [key, query, attempt]);

  const current = state.key === key ? state : { key, status: "loading" as const, movie: null, tv: null };
  const { movie, tv } = current;
  const retry = () => setAttempt((n) => n + 1);

  const tracks = [
    { type: MediaTypeT.movie, result: movie, icon: Film, noun: isEs ? "Películas" : "Movies" },
    { type: MediaTypeT.tv, result: tv, icon: Tv, noun: isEs ? "Series" : "TV series" },
  ];

  const bothFailed = movie?.failed && tv?.failed;
  const nothingFound =
    current.status === "ready" &&
    !movie?.failed &&
    !tv?.failed &&
    movie?.data?.total_results === 0 &&
    tv?.data?.total_results === 0;

  // A whitespace-only query has nothing to search for.
  if (!query) return <Navigate to="/" replace />;

  return (
    <>
      {current.status === "loading" ? (
        <PopcornParticlesLoader />
      ) : bothFailed ? (
        <div className="container mx-auto px-4 pt-6 sm:px-6">
          <LoadError
            message={
              isEs
                ? "No pudimos completar la búsqueda: el servidor no respondió."
                : "We couldn't finish the search: the server didn't respond."
            }
            onRetry={retry}
            isEs={isEs}
          />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-text-low dark:text-dark-text-low my-4">
            {isEs ? `Resultados para “${query}”` : `Results for “${query}”`}
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 w-auto">
            {tracks.map(({ type, result, icon: Icon, noun }) => (
              <Link
                key={type}
                to={searchPath(type, query)}
                className="flex flex-col items-start p-4 bg-surface-2 dark:bg-dark-surface-2 text-text-low dark:text-dark-text-low hover:text-accent-ink dark:hover:text-dark-accent transition-colors rounded-lg min-w-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:focus-visible:outline-dark-accent">
                <span className="flex items-start gap-2">
                  <Icon size={14} aria-hidden="true" />
                  <span className="leading-none tabular-nums">
                    {noun}
                    {result?.data ? ` · ${countLabel(result.data.total_results, isEs)}` : ""}
                  </span>
                </span>
              </Link>
            ))}
          </div>

          {tracks.map(({ type, result, noun }) => {
            if (result?.failed) {
              return (
                <div
                  key={type}
                  role="alert"
                  className="mt-8 flex flex-wrap items-center justify-center gap-3 px-4 text-sm text-text-low dark:text-dark-text-low">
                  {type === MediaTypeT.movie
                    ? isEs ? "No pudimos cargar las películas." : "We couldn't load the movies."
                    : isEs ? "No pudimos cargar las series." : "We couldn't load the TV series."}
                  <button
                    type="button"
                    onClick={retry}
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-semibold text-accent-ink cursor-pointer hover:bg-surface-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:text-dark-accent dark:hover:bg-dark-surface-1 dark:focus-visible:outline-dark-accent">
                    <RotateCw className="h-4 w-4" aria-hidden="true" />
                    {isEs ? "Reintentar" : "Try again"}
                  </button>
                </div>
              );
            }

            const data = result?.data;
            if (!data || data.results.length === 0) return null;

            return (
              <div key={type} className="mt-8">
                <h2 className="text-text-low dark:text-dark-text-low mb-4 p-3 bg-surface-1 dark:bg-dark-surface-1 rounded-t-lg">
                  {noun}
                </h2>
                <CreateMedia type={type} media={data.results.slice(0, PREVIEW_COUNT)} />
                {data.total_results > PREVIEW_COUNT ? (
                  <div className="mt-4 flex justify-center">
                    <Link
                      to={searchPath(type, query)}
                      className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-accent-ink underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:text-dark-accent dark:focus-visible:outline-dark-accent">
                      {isEs
                        ? `Ver los ${countLabel(data.total_results, true)}`
                        : `See all ${countLabel(data.total_results, false)}`}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                ) : null}
              </div>
            );
          })}

          {nothingFound && (
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
