import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Bookmark } from "lucide-react";
import { useSavedMedia } from "@/context/favorite-media-context";
import { RemovedEntry, SavedItem } from "@/context/favorite-media-context/types";
import { LazyMediaContainer } from "@/components/common/lazy-media-container";
import { SelectPill } from "@/components/common/select-pill";
import { primaryButton } from "@/components/common/load-error";
import { gridClasses } from "@/components/specific/browse-grid";
import { MediaTypeT } from "@/types/media-type";
import { MovieInterface, TVInterface } from "@/types/movie-and-tv-interface";
import { isSpanishLang } from "@/utils/is-spanish-lang";
import { useLanguages } from "@/context/lang";
import { SAVED_SORTS, SavedSort, savedSortLabel, trackCount, trackNoun } from "./saved-copy";
import { UndoRemoval } from "./UndoRemoval";

const pillFocus =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:focus-visible:outline-dark-accent";

const textLink = `rounded-full px-3 py-2 text-sm font-semibold text-accent-ink underline-offset-4 hover:underline dark:text-dark-accent ${pillFocus}`;

const itemTitle = (item: SavedItem) => ("title" in item ? item.title : item.name);

/**
 * The user's collection. Type and sort live in the query string
 * (?type=tv&sort=rating). Removing a title here offers Undo and keeps keyboard
 * focus on the grid instead of dropping it to the top of the page.
 */
const SavedMedia = (): React.JSX.Element => {
  const { language } = useLanguages();
  const isEs = isSpanishLang(language);
  const locale = isEs ? "es-MX" : "en-US";
  const { savedMedia, restoreMedia, lastRemoved } = useSavedMedia();
  const [searchParams, setSearchParams] = useSearchParams();

  const counts = { [MediaTypeT.movie]: savedMedia.movies.length, [MediaTypeT.tv]: savedMedia.tv.length };
  const total = counts[MediaTypeT.movie] + counts[MediaTypeT.tv];

  const typeParam = searchParams.get("type");
  // No explicit type: open the track that has something in it.
  const type =
    typeParam === MediaTypeT.tv || typeParam === MediaTypeT.movie
      ? typeParam
      : counts[MediaTypeT.movie] === 0 && counts[MediaTypeT.tv] > 0
        ? MediaTypeT.tv
        : MediaTypeT.movie;
  const other = type === MediaTypeT.movie ? MediaTypeT.tv : MediaTypeT.movie;

  const sortParam = searchParams.get("sort") as SavedSort | null;
  const sort: SavedSort = sortParam && SAVED_SORTS.includes(sortParam) ? sortParam : "recent";

  const items: SavedItem[] = useMemo(() => {
    const list: SavedItem[] = [...(type === MediaTypeT.movie ? savedMedia.movies : savedMedia.tv)];
    switch (sort) {
      case "title":
        return list.sort((a, b) => itemTitle(a).localeCompare(itemTitle(b), locale, { sensitivity: "base" }));
      case "rating":
        return list.sort((a, b) => b.vote_average - a.vote_average || b.savedAt - a.savedAt);
      default:
        return list.sort((a, b) => b.savedAt - a.savedAt);
    }
  }, [savedMedia, type, sort, locale]);

  const hrefWith = (next: { type?: MediaTypeT; sort?: SavedSort }) => {
    const params = new URLSearchParams();
    const nextType = next.type ?? type;
    const nextSort = next.sort ?? sort;
    if (nextType === MediaTypeT.tv) params.set("type", MediaTypeT.tv);
    if (nextSort !== "recent") params.set("sort", nextSort);
    const search = params.toString();
    return search ? `?${search}` : "";
  };

  useEffect(() => {
    const previous = document.title;
    document.title = `${isEs ? "Guardados" : "Saved"} · MoviesKS`;
    return () => {
      document.title = previous;
    };
  }, [isEs]);

  // --- Removal: undo bar, announcement, focus ------------------------------------------
  const headingRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const renderedIdsRef = useRef<number[]>([]);
  // Only removals made while this page is open get an Undo bar.
  const mountSeqRef = useRef(lastRemoved?.seq ?? 0);
  const [undoEntry, setUndoEntry] = useState<RemovedEntry | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const focusIdRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    if (!lastRemoved || lastRemoved.seq <= mountSeqRef.current) return;
    mountSeqRef.current = lastRemoved.seq;
    setUndoEntry(lastRemoved);
    setAnnouncement(
      isEs ? `${itemTitle(lastRemoved.item)} quitado de guardados.` : `${itemTitle(lastRemoved.item)} removed from saved.`
    );

    // The pressed button unmounted with its card; move focus to the card that took its place.
    const active = document.activeElement;
    if (active && active !== document.body) return;
    const index = renderedIdsRef.current.indexOf(lastRemoved.item.id);
    const cards = listRef.current?.children;
    const target =
      (index >= 0 && cards ? (cards[index] ?? cards[index - 1]) : null)?.querySelector<HTMLElement>("a, button") ??
      headingRef.current;
    target?.focus();
  }, [lastRemoved, isEs]);

  // Record what is on screen after every render, for the next removal lookup.
  useEffect(() => {
    renderedIdsRef.current = items.map((item) => item.id);
    if (focusIdRef.current === null) return;
    const index = items.findIndex((item) => item.id === focusIdRef.current);
    focusIdRef.current = null;
    // The restored card mounts its link a frame or two later (lazy container), so retry briefly.
    let frames = 0;
    let raf = 0;
    const tryFocus = () => {
      const link = listRef.current?.children[index]?.querySelector<HTMLElement>("a, button");
      if (link) link.focus();
      else if (frames++ < 30) raf = requestAnimationFrame(tryFocus);
    };
    tryFocus();
    return () => cancelAnimationFrame(raf);
  });

  const dismissUndo = useCallback(() => setUndoEntry(null), []);

  const undo = () => {
    if (!undoEntry) return;
    focusIdRef.current = undoEntry.item.id;
    restoreMedia(undoEntry.type, undoEntry.item);
    setAnnouncement(isEs ? `${itemTitle(undoEntry.item)} restaurado.` : `${itemTitle(undoEntry.item)} restored.`);
    setUndoEntry(null);
  };
  // ------------------------------------------------------------------------------------------

  return (
    <div className="container mx-auto px-4 pt-6 pb-16 sm:px-6 lg:pt-2">
      <p role="status" className="sr-only">
        {announcement}
      </p>

      <header className="mb-5 sm:mb-8">
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="text-3xl font-bold leading-tight tracking-tight text-balance text-text-high outline-none dark:text-dark-text-high sm:text-4xl">
          {isEs ? "Guardados" : "Saved"}
        </h1>
        <p className="mt-2 flex flex-wrap items-center gap-x-2 text-sm text-text-low dark:text-dark-text-low">
          {total > 0 ? (
            <>
              <span className="tabular-nums after:ml-2 after:content-['·']">
                {trackCount(MediaTypeT.movie, counts[MediaTypeT.movie], isEs)}
              </span>
              <span className="tabular-nums after:ml-2 after:content-['·']">
                {trackCount(MediaTypeT.tv, counts[MediaTypeT.tv], isEs)}
              </span>
            </>
          ) : null}
          <span>{isEs ? "Se guardan solo en este navegador." : "Kept on this browser only."}</span>
        </p>
      </header>

      {total === 0 ? (
        <div className="mx-auto flex max-w-md flex-col items-center gap-3 py-12 text-center">
          <Bookmark className="h-10 w-10 text-secondary dark:text-dark-secondary" aria-hidden="true" />
          <h2 className="text-xl font-semibold text-text-high dark:text-dark-text-high">
            {isEs ? "Aún no has guardado nada" : "Nothing saved yet"}
          </h2>
          <p className="text-text-low dark:text-dark-text-low">
            {isEs
              ? "Toca el marcador de cualquier póster y el título aparecerá aquí, listo para cuando quieras verlo."
              : "Tap the bookmark on any poster and the title lands here, ready for when you want to watch it."}
          </p>
          <Link to="/movie" className={`${primaryButton} mt-2`}>
            {isEs ? "Explorar películas" : "Browse movies"}
          </Link>
          <Link to="/tv" className={textLink}>
            {isEs ? "Explorar series" : "Browse TV series"}
          </Link>
        </div>
      ) : (
        <>
          {/* Phones: toggle on its own row, sort below. sm+: one row. */}
          <div className="grid grid-cols-1 gap-3 sm:flex sm:items-center sm:justify-between">
            <nav
              aria-label={isEs ? "Tipo de título" : "Title type"}
              className="grid grid-cols-2 rounded-full bg-surface-1 p-1 shadow-sm dark:bg-dark-surface-1 sm:inline-flex">
              {[MediaTypeT.movie, MediaTypeT.tv].map((target) => {
                const active = target === type;
                return (
                  <Link
                    key={target}
                    to={hrefWith({ type: target })}
                    replace
                    aria-current={active ? "page" : undefined}
                    className={`inline-flex h-9 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors duration-200 sm:h-8 ${pillFocus} ${
                      active
                        ? "bg-surface-3 text-text-high shadow-sm dark:bg-dark-surface-3 dark:text-dark-text-high"
                        : "text-text-low hover:text-text-high dark:text-dark-text-low dark:hover:text-dark-text-high"
                    }`}>
                    {trackNoun(target, isEs)}
                    <span className="tabular-nums font-normal text-text-low dark:text-dark-text-low">
                      {counts[target]}
                    </span>
                  </Link>
                );
              })}
            </nav>

            {items.length > 1 ? (
              <div className="sm:w-auto">
                <SelectPill
                  label={isEs ? "Ordenar" : "Sort"}
                  value={sort}
                  onChange={(value) => setSearchParams(new URLSearchParams(hrefWith({ sort: value as SavedSort })), { replace: true })}>
                  {SAVED_SORTS.map((option) => (
                    <option key={option} value={option}>
                      {savedSortLabel(option, isEs)}
                    </option>
                  ))}
                </SelectPill>
              </div>
            ) : null}
          </div>

          <section aria-label={trackNoun(type, isEs)} className="mt-8">
            {items.length === 0 ? (
              <div className="mx-auto flex max-w-md flex-col items-center gap-2 py-10 text-center">
                <p className="text-text-low dark:text-dark-text-low">
                  {type === MediaTypeT.movie
                    ? isEs ? "No has guardado ninguna película." : "You haven't saved any movies."
                    : isEs ? "No has guardado ninguna serie." : "You haven't saved any TV series."}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-x-2">
                  <Link to={hrefWith({ type: other })} replace className={textLink}>
                    {isEs
                      ? `Ver tus ${trackCount(other, counts[other], true)}`
                      : `See your ${trackCount(other, counts[other], false)}`}
                  </Link>
                  <Link to={`/${type}`} className={textLink}>
                    {type === MediaTypeT.movie
                      ? isEs ? "Explorar películas" : "Browse movies"
                      : isEs ? "Explorar series" : "Browse TV series"}
                  </Link>
                </div>
              </div>
            ) : (
              <ul ref={listRef} className={gridClasses}>
                {items.map((item) => (
                  <li key={item.id}>
                    {/* Saved records keep only what a poster card reads (id, title/name, poster, rating). */}
                    <LazyMediaContainer
                      media_={item as unknown as MovieInterface | TVInterface}
                      type={type}
                      containerType="Normal"
                    />
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}

      {undoEntry ? <UndoRemoval entry={undoEntry} onUndo={undo} onDismiss={dismissUndo} isEs={isEs} /> : null}
    </div>
  );
};

export { SavedMedia };
