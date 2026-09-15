import { Link } from "react-router-dom";
import { Check, ChevronDown, RotateCw } from "lucide-react";
import { ShimmerBox } from "@/components/utilities/loading-skeletons/ShimmerBox";
import { MediaTypeT } from "@/types/media-type";
import { GenreInterface } from "@/types/genre-interface";
import { BrowseFilters, BrowseSort } from "@/services/browse-media/types";
import { SORTS, toBrowseSearch, yearOptions } from "./browse-params";
import { sortLabel } from "./browse-copy";

interface BrowseControlsProps {
  type: MediaTypeT;
  filters: BrowseFilters;
  onChange: (next: BrowseFilters) => void;
  genres: GenreInterface[];
  genresLoading: boolean;
  genresFailed: boolean;
  onRetryGenres: () => void;
  isEs: boolean;
}

const pillFocus =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:focus-visible:outline-dark-accent";

const SelectPill = ({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}) => (
  // Phones: fills its grid cell and hides the visible label (values name themselves).
  // sm+: sizes to content with the muted label shown.
  <label className="relative flex h-11 w-full min-w-0 items-center gap-2 rounded-full bg-surface-1 pl-4 pr-9 text-sm shadow-sm transition-shadow focus-within:ring-2 focus-within:ring-accent dark:bg-dark-surface-1 dark:focus-within:ring-dark-accent sm:h-10 sm:w-auto">
    <span className="max-sm:sr-only shrink-0 text-text-low dark:text-dark-text-low">{label}</span>
    {/* Native select: the OS picker is the best thumb-reach control on phones.
        A select is as wide as its longest option, so it must be allowed to shrink (min-w-0 + truncate). */}
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-full min-w-0 flex-1 cursor-pointer appearance-none truncate bg-transparent font-semibold text-text-high outline-none dark:text-dark-text-high sm:flex-none [&>option]:bg-surface-3 [&>option]:text-text-high dark:[&>option]:bg-dark-surface-2 dark:[&>option]:text-dark-text-high">
      {children}
    </select>
    <ChevronDown
      aria-hidden="true"
      className="pointer-events-none absolute right-3 h-4 w-4 text-text-low dark:text-dark-text-low"
    />
  </label>
);

const chipBase = `inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full px-4 text-sm font-medium cursor-pointer transition-colors duration-200 sm:h-9 ${pillFocus}`;
const chipOff =
  "bg-surface-1 text-text-high hover:bg-surface-3 dark:bg-dark-surface-1 dark:text-dark-text-high dark:hover:bg-dark-surface-3";
const chipOn =
  "bg-accent-ink text-white hover:bg-primary dark:bg-dark-accent dark:text-dark-bg-main dark:hover:bg-dark-primary";

const BrowseControls = ({
  type,
  filters,
  onChange,
  genres,
  genresLoading,
  genresFailed,
  onRetryGenres,
  isEs,
}: BrowseControlsProps) => {
  const toggleGenre = (id: number) => {
    const selected = filters.genres.includes(id);
    onChange({
      ...filters,
      genres: selected
        ? filters.genres.filter((g) => g !== id)
        : [...filters.genres, id],
    });
  };

  // Genre ids differ between movies and TV, so switching type keeps sort and year only.
  const typeHref = (target: MediaTypeT) =>
    `/${target}${toBrowseSearch({ ...filters, genres: [] })}`;

  const filtered = filters.genres.length > 0 || filters.year !== null;

  return (
    // grid-cols-1 is minmax(0,1fr): a bare `grid` gets an auto track that grows to the
    // min-content of its widest child — here the unwrapped chip rail (~1900px) — and drags every row with it.
    <div className="grid grid-cols-1 gap-4">
      {/* Phones: toggle on its own row, Sort and Year share the next one. sm+: a single row. */}
      <div className="grid min-w-0 grid-cols-1 gap-3 sm:flex sm:flex-wrap sm:items-center">
        <nav
          aria-label={isEs ? "Tipo de título" : "Title type"}
          className="grid grid-cols-2 rounded-full bg-surface-1 p-1 shadow-sm dark:bg-dark-surface-1 sm:inline-flex">
          {[MediaTypeT.movie, MediaTypeT.tv].map((target) => {
            const active = target === type;
            return (
              <Link
                key={target}
                to={typeHref(target)}
                aria-current={active ? "page" : undefined}
                className={`inline-flex h-9 items-center justify-center rounded-full px-4 text-sm sm:h-8 font-semibold transition-colors duration-200 ${pillFocus} ${
                  active
                    ? "bg-surface-3 text-text-high shadow-sm dark:bg-dark-surface-3 dark:text-dark-text-high"
                    : "text-text-low hover:text-text-high dark:text-dark-text-low dark:hover:text-dark-text-high"
                }`}>
                {target === MediaTypeT.movie
                  ? isEs ? "Películas" : "Movies"
                  : isEs ? "Series" : "TV series"}
              </Link>
            );
          })}
        </nav>

        <div className="grid grid-cols-2 gap-3 sm:ml-auto sm:flex sm:items-center">
          <SelectPill
            label={isEs ? "Ordenar" : "Sort"}
            value={filters.sort}
            onChange={(value) =>
              onChange({ ...filters, sort: value as BrowseSort })
            }>
            {SORTS.map((sort) => (
              // TMDB can't filter trending lists, so it's only offered unfiltered.
              <option key={sort} value={sort} disabled={sort === "trending" && filtered}>
                {sortLabel(sort, isEs)}
              </option>
            ))}
          </SelectPill>

          <SelectPill
            label={isEs ? "Año" : "Year"}
            value={filters.year === null ? "" : String(filters.year)}
            onChange={(value) =>
              onChange({ ...filters, year: value ? Number(value) : null })
            }>
            <option value="">{isEs ? "Cualquier año" : "Any year"}</option>
            {yearOptions().map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </SelectPill>
        </div>
      </div>

      <div
        role="group"
        aria-label={isEs ? "Géneros" : "Genres"}
        className="min-w-0">
        {genresFailed ? (
          <p className="flex flex-wrap items-center gap-3 text-sm text-text-low dark:text-dark-text-low">
            {isEs ? "No pudimos cargar los géneros." : "We couldn't load the genres."}
            <button
              type="button"
              onClick={onRetryGenres}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-semibold text-accent-ink cursor-pointer hover:bg-surface-1 dark:text-dark-accent dark:hover:bg-dark-surface-1 ${pillFocus}`}>
              <RotateCw className="h-4 w-4" aria-hidden="true" />
              {isEs ? "Reintentar" : "Try again"}
            </button>
          </p>
        ) : (
          // Phones: one swipeable line that bleeds to the screen edges; sm+: wrapped lines.
          <ul className="flex gap-2 overflow-x-auto overscroll-x-contain scrollbar-minimal py-1.5 max-sm:-mx-4 max-sm:scroll-px-4 max-sm:px-4 max-sm:rail-fade sm:flex-wrap sm:overflow-visible">
            <li>
              <button
                type="button"
                aria-pressed={filters.genres.length === 0}
                onClick={() => onChange({ ...filters, genres: [] })}
                className={`${chipBase} ${filters.genres.length === 0 ? chipOn : chipOff}`}>
                {isEs ? "Todos" : "All"}
              </button>
            </li>
            {genresLoading
              ? ["w-20", "w-24", "w-16", "w-28", "w-20", "w-24", "w-16", "w-20"].map((width, i) => (
                  <li key={i} aria-hidden="true">
                    <ShimmerBox className={`h-10 rounded-full sm:h-9 ${width}`} />
                  </li>
                ))
              : genres.map((genre) => {
                  const selected = filters.genres.includes(genre.id);
                  return (
                    <li key={genre.id}>
                      <button
                        type="button"
                        aria-pressed={selected}
                        onClick={() => toggleGenre(genre.id)}
                        className={`${chipBase} ${selected ? chipOn : chipOff}`}>
                        {selected ? (
                          <Check className="-ml-1 h-4 w-4" aria-hidden="true" />
                        ) : null}
                        {genre.name}
                      </button>
                    </li>
                  );
                })}
          </ul>
        )}
      </div>
    </div>
  );
};

export { BrowseControls };
