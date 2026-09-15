import { useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { RotateCw, SearchX, TriangleAlert, X } from "lucide-react";
import { useLanguages } from "@/context/lang";
import { isSpanishLang } from "@/utils/is-spanish-lang";
import { useValidMediaType } from "@/hooks/use-valid-media-type";
import { BrowseFilters } from "@/services/browse-media/types";
import { parseBrowseFilters, toBrowseSearch } from "./browse-params";
import { browseTitle, countLabel, sortLabel, typeNoun } from "./browse-copy";
import { useGenres } from "./use-genres";
import { useBrowseMedia } from "./use-browse-media";
import { BrowseControls } from "./BrowseControls";
import { BrowseGrid, BrowseGridSkeleton } from "./BrowseGrid";

const primaryButton =
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-accent-ink px-5 py-2.5 text-sm font-semibold text-white cursor-pointer transition-colors duration-200 hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:bg-dark-accent dark:text-dark-bg-main dark:hover:bg-dark-primary dark:focus-visible:outline-dark-accent";

/**
 * Browse page for /movie and /tv. Every filter lives in the query string
 * (?genres=28,35&sort=top_rated&year=2024), so Back, reload and sharing work.
 */
const FilteredMedia = (): React.JSX.Element => {
  const { language } = useLanguages();
  const isEs = isSpanishLang(language);
  const type = useValidMediaType();
  const [searchParams, setSearchParams] = useSearchParams();

  const searchString = searchParams.toString();
  const filters = useMemo(
    () => parseBrowseFilters(new URLSearchParams(searchString)),
    [searchString]
  );

  const genres = useGenres(type, language);
  const browse = useBrowseMedia(type, filters, language);

  const headingRef = useRef<HTMLHeadingElement>(null);

  const updateFilters = (next: BrowseFilters) => {
    // Normalize through the parser so trending+filters falls back to popular.
    const normalized = parseBrowseFilters(
      new URLSearchParams(toBrowseSearch(next))
    );
    setSearchParams(new URLSearchParams(toBrowseSearch(normalized)));

    // Deep in the grid, bring the fresh results into view.
    const heading = headingRef.current;
    if (heading && heading.getBoundingClientRect().top < 0) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      heading.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
  };

  const title = browseTitle(type, filters, genres.genres, isEs);
  const hasFilters = filters.genres.length > 0 || filters.year !== null;

  useEffect(() => {
    const previous = document.title;
    document.title = `${title} · MoviesKS`;
    return () => {
      document.title = previous;
    };
  }, [title]);

  const meta = [
    filters.genres.length > 0 ? typeNoun(type, isEs) : null,
    filters.sort !== "trending" || filters.genres.length > 0
      ? sortLabel(filters.sort, isEs)
      : null,
    filters.year !== null ? String(filters.year) : null,
  ].filter(Boolean);

  const { status, items } = browse;
  const refreshing = status === "loading" && items.length > 0;

  return (
    <div className="container mx-auto px-4 pt-6 pb-16 sm:px-6 lg:pt-2">
      <header className="mb-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 sm:mb-8">
        <div className="min-w-0">
          <h1
            ref={headingRef}
            className="scroll-mt-24 text-3xl font-bold leading-tight tracking-tight text-balance break-words text-text-high dark:text-dark-text-high sm:text-4xl">
            {title}
          </h1>
          <p
            aria-live="polite"
            className="mt-2 flex flex-wrap items-center gap-x-2 text-sm text-text-low dark:text-dark-text-low">
            {meta.map((part) => (
              <span key={part} className="after:ml-2 after:content-['·']">
                {part}
              </span>
            ))}
            <span className="tabular-nums">
              {status === "ready"
                ? countLabel(browse.totalResults, isEs)
                : status === "loading"
                  ? isEs ? "Cargando títulos…" : "Loading titles…"
                  : isEs ? "Sin resultados" : "No results"}
            </span>
          </p>
        </div>

        {hasFilters ? (
          <button
            type="button"
            onClick={() => updateFilters({ genres: [], sort: filters.sort, year: null })}
            className="-ml-3 inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold sm:ml-0 text-accent-ink cursor-pointer transition-colors hover:bg-surface-1 focus-visible:outline-2 focus-visible:outline-accent dark:text-dark-accent dark:hover:bg-dark-surface-1 dark:focus-visible:outline-dark-accent">
            <X className="h-4 w-4" aria-hidden="true" />
            {isEs ? "Quitar filtros" : "Clear filters"}
          </button>
        ) : null}
      </header>

      <BrowseControls
        type={type}
        filters={filters}
        onChange={updateFilters}
        genres={genres.genres}
        genresLoading={genres.loading}
        genresFailed={genres.failed}
        onRetryGenres={genres.retry}
        isEs={isEs}
      />

      <section
        aria-label={isEs ? "Resultados" : "Results"}
        aria-busy={status === "loading"}
        className="mt-8">
        {status === "error" ? (
          <div
            role="alert"
            className="mx-auto flex max-w-3xl flex-col gap-4 rounded-xl bg-surface-1 px-5 py-4 text-sm text-text-high shadow-sm dark:bg-dark-surface-1 dark:text-dark-text-high sm:flex-row sm:items-center">
            <TriangleAlert
              className="h-5 w-5 shrink-0 text-accent-ink dark:text-dark-accent"
              aria-hidden="true"
            />
            <p className="flex-1 text-text-low dark:text-dark-text-low">
              {isEs
                ? "No pudimos cargar los títulos: el servidor no respondió."
                : "We couldn't load the titles: the server didn't respond."}
            </p>
            <button type="button" onClick={browse.retry} className={`${primaryButton} self-start sm:self-auto`}>
              <RotateCw className="h-4 w-4" aria-hidden="true" />
              {isEs ? "Reintentar" : "Try again"}
            </button>
          </div>
        ) : status === "loading" && items.length === 0 ? (
          <>
            <span className="sr-only" role="status">
              {isEs ? "Cargando títulos…" : "Loading titles…"}
            </span>
            <BrowseGridSkeleton />
          </>
        ) : status === "ready" && items.length === 0 ? (
          <div className="mx-auto flex max-w-md flex-col items-center gap-3 py-12 text-center">
            <SearchX className="h-10 w-10 text-secondary dark:text-dark-secondary" aria-hidden="true" />
            <h2 className="text-xl font-semibold text-text-high dark:text-dark-text-high">
              {isEs ? "Ningún título coincide" : "No titles match"}
            </h2>
            <p className="text-text-low dark:text-dark-text-low">
              {filters.genres.length > 1
                ? isEs
                  ? "Buscamos títulos que tengan todos los géneros elegidos a la vez. Prueba quitando uno."
                  : "We look for titles that have every chosen genre at once. Try removing one."
                : isEs
                  ? "Prueba con otro año u otro género."
                  : "Try another year or genre."}
            </p>
            {hasFilters ? (
              <button
                type="button"
                onClick={() => updateFilters({ genres: [], sort: filters.sort, year: null })}
                className={`${primaryButton} mt-2`}>
                {isEs ? "Quitar filtros" : "Clear filters"}
              </button>
            ) : null}
          </div>
        ) : (
          <BrowseGrid
            items={items}
            type={type}
            refreshing={refreshing}
            hasMore={browse.hasMore}
            more={browse.more}
            onLoadMore={browse.loadMore}
            isEs={isEs}
          />
        )}
      </section>
    </div>
  );
};

export { FilteredMedia };
