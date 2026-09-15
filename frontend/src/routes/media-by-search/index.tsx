import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { SearchX } from "lucide-react";
import { useLanguages } from "@/context/lang";
import { isSpanishLang } from "@/utils/is-spanish-lang";
import { useValidMediaType } from "@/hooks/use-valid-media-type";
import { MediaTypeT } from "@/types/media-type";
import { LoadError, primaryButton } from "@/components/common/load-error";
import { BrowseGrid, BrowseGridSkeleton } from "@/components/specific/browse-grid";
import { countLabel, typeNoun } from "@/routes/filtered-media/browse-copy";
import { useSearchMedia } from "./use-search-media";
import { searchPath as searchHref } from "./search-path";

const pillFocus =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:focus-visible:outline-dark-accent";

/**
 * Title search for /search/movie/:query and /search/tv/:query. The query and
 * type live in the path, so Back, reload and sharing work; the toggle keeps
 * the query and switches the track.
 */
const MediaBySearch = (): React.JSX.Element => {
  const { language } = useLanguages();
  const isEs = isSpanishLang(language);
  const type = useValidMediaType();
  const query = (useParams().query ?? "").trim();
  const other = type === MediaTypeT.movie ? MediaTypeT.tv : MediaTypeT.movie;

  const search = useSearchMedia(type, query, language);
  const { status, items } = search;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type, query]);

  useEffect(() => {
    const previous = document.title;
    document.title = `“${query}” · ${typeNoun(type, isEs)} · MoviesKS`;
    return () => {
      document.title = previous;
    };
  }, [query, type, isEs]);

  const noun = typeNoun(type, isEs);

  return (
    <div className="container mx-auto px-4 pt-6 pb-16 sm:px-6 lg:pt-2">
      <header className="mb-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 sm:mb-8">
        <div className="min-w-0">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-balance break-words text-text-high dark:text-dark-text-high sm:text-4xl">
            {isEs ? "Resultados para " : "Results for "}
            <span className="text-accent-ink dark:text-dark-accent">“{query}”</span>
          </h1>
          <p
            aria-live="polite"
            className="mt-2 flex flex-wrap items-center gap-x-2 text-sm text-text-low dark:text-dark-text-low">
            <span className="after:ml-2 after:content-['·']">{noun}</span>
            <span className="tabular-nums">
              {status === "ready"
                ? countLabel(search.totalResults, isEs)
                : status === "loading"
                  ? isEs ? "Buscando…" : "Searching…"
                  : isEs ? "Búsqueda fallida" : "Search failed"}
            </span>
          </p>
        </div>

        <nav
          aria-label={isEs ? "Buscar en" : "Search in"}
          className="grid w-full grid-cols-2 rounded-full bg-surface-1 p-1 shadow-sm dark:bg-dark-surface-1 sm:inline-flex sm:w-auto">
          {[MediaTypeT.movie, MediaTypeT.tv].map((target) => {
            const active = target === type;
            return (
              <Link
                key={target}
                to={searchHref(target, query)}
                aria-current={active ? "page" : undefined}
                className={`inline-flex h-9 items-center justify-center rounded-full px-4 text-sm font-semibold transition-colors duration-200 sm:h-8 ${pillFocus} ${
                  active
                    ? "bg-surface-3 text-text-high shadow-sm dark:bg-dark-surface-3 dark:text-dark-text-high"
                    : "text-text-low hover:text-text-high dark:text-dark-text-low dark:hover:text-dark-text-high"
                }`}>
                {typeNoun(target, isEs)}
              </Link>
            );
          })}
        </nav>
      </header>

      <section
        aria-label={isEs ? "Resultados" : "Results"}
        aria-busy={status === "loading"}>
        {status === "error" ? (
          <LoadError
            message={
              isEs
                ? "No pudimos completar la búsqueda: el servidor no respondió."
                : "We couldn't finish the search: the server didn't respond."
            }
            onRetry={search.retry}
            isEs={isEs}
          />
        ) : status === "loading" ? (
          <>
            <span className="sr-only" role="status">
              {isEs ? "Buscando…" : "Searching…"}
            </span>
            <BrowseGridSkeleton />
          </>
        ) : items.length === 0 ? (
          <div className="mx-auto flex max-w-md flex-col items-center gap-3 py-12 text-center">
            <SearchX className="h-10 w-10 text-secondary dark:text-dark-secondary" aria-hidden="true" />
            <h2 className="text-xl font-semibold text-balance break-words text-text-high dark:text-dark-text-high">
              {type === MediaTypeT.movie
                ? isEs ? `Ninguna película coincide con “${query}”` : `No movies match “${query}”`
                : isEs ? `Ninguna serie coincide con “${query}”` : `No TV series match “${query}”`}
            </h2>
            <p className="text-text-low dark:text-dark-text-low">
              {type === MediaTypeT.movie
                ? isEs
                  ? "Revisa la ortografía o prueba con menos palabras. Puede que sea una serie."
                  : "Check the spelling or try fewer words. It might be a TV series."
                : isEs
                  ? "Revisa la ortografía o prueba con menos palabras. Puede que sea una película."
                  : "Check the spelling or try fewer words. It might be a movie."}
            </p>
            <Link to={searchHref(other, query)} className={`${primaryButton} mt-2`}>
              {other === MediaTypeT.tv
                ? isEs ? "Buscar en Series" : "Search TV series"
                : isEs ? "Buscar en Películas" : "Search movies"}
            </Link>
            <Link
              to={`/${type}`}
              className={`rounded-full px-3 py-2 text-sm font-semibold text-accent-ink underline-offset-4 hover:underline dark:text-dark-accent ${pillFocus}`}>
              {type === MediaTypeT.movie
                ? isEs ? "Explorar películas" : "Browse movies"
                : isEs ? "Explorar series" : "Browse TV series"}
            </Link>
          </div>
        ) : (
          <BrowseGrid
            items={items}
            type={type}
            refreshing={false}
            hasMore={search.hasMore}
            more={search.more}
            onLoadMore={search.loadMore}
            isEs={isEs}
          />
        )}
      </section>
    </div>
  );
};

export { MediaBySearch };
