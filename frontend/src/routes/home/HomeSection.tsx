import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Film, Star } from "lucide-react";
import { LazyMediaContainer } from "@/components/common/lazy-media-container";
import { RailArrow } from "@/components/common/rail-arrow";
import { mediaImageSrc } from "@/utils/media-image-src";
import { MediaSectionData } from "./types";
import { mediaRating, mediaTitle, mediaYear } from "./media-fields";

const RANKED_COUNT = 4;

interface HomeSectionProps {
  section: MediaSectionData;
  /** How many leading items are already shown elsewhere (the lead feature). */
  offset: number;
  isEs: boolean;
}

const HomeSection = ({ section, offset, isEs }: HomeSectionProps) => {
  const railRef = useRef<HTMLUListElement>(null);
  const headingId = `home-section-${section.id}`;

  const ranked = section.media.slice(offset, offset + RANKED_COUNT);
  const rail = section.media.slice(offset + RANKED_COUNT);
  const glow = section.media[offset];
  const glowPath = glow?.backdrop_path ?? glow?.poster_path;

  const scrollRail = (direction: 1 | -1) => {
    const row = railRef.current;
    if (!row) return;
    row.scrollBy({ left: direction * row.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section aria-labelledby={headingId} className="mt-10 sm:mt-14">
      <div className="relative isolate overflow-hidden rounded-[20px] bg-surface-1 p-4 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_32px_-20px_rgba(0,0,0,0.35)] dark:bg-dark-surface-1 sm:p-5 md:p-6">
        {glowPath ? (
          <>
            <img
              className="pointer-events-none absolute -inset-[15%] -z-[2] h-[130%] w-[130%] object-cover opacity-25 blur-[48px] saturate-110"
              src={mediaImageSrc(glowPath, "w300")}
              alt=""
              aria-hidden="true"
              loading="lazy"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-[1] bg-gradient-to-b from-surface-1/55 via-surface-1/85 to-surface-1/95 dark:from-dark-surface-1/55 dark:via-dark-surface-1/85 dark:to-dark-surface-1/95"
            />
          </>
        ) : null}

        <div className="mb-4 flex items-end justify-between gap-2 sm:mb-5 sm:gap-4">
          <h2
            id={headingId}
            className="text-xl font-bold tracking-tight text-text-high dark:text-dark-text-high md:text-2xl">
            {section.title}
          </h2>
          <Link
            to={`/${section.type}?sort=${section.id.startsWith("top-rated") ? "top_rated" : "popular"}`}
            aria-label={isEs ? `Ver todo: ${section.title}` : `See all: ${section.title}`}
            className="group/all inline-flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium text-text-low transition-colors hover:bg-surface-3 hover:text-accent-ink focus-visible:outline-2 focus-visible:outline-accent dark:text-dark-text-low dark:hover:bg-dark-surface-2 dark:hover:text-dark-accent dark:focus-visible:outline-dark-accent">
            {isEs ? "Ver todo" : "See all"}
            <ChevronRight
              aria-hidden="true"
              className="h-4 w-4 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover/all:translate-x-0.5"
            />
          </Link>
        </div>

        <ol
          start={offset + 1}
          className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 xl:grid-cols-4">
          {ranked.map((item, i) => {
            const rating = mediaRating(item);
            const year = mediaYear(item);
            return (
              <li key={item.id} className="min-w-0">
                <Link
                  to={`/${section.type}/detail/${item.id}`}
                  className="group/row flex min-w-0 items-center gap-3 rounded-xl bg-surface-3 p-2 pr-3 shadow-sm transition-[background-color,box-shadow] duration-200 hover:bg-surface-2 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:bg-dark-surface-2 dark:hover:bg-dark-surface-3 dark:focus-visible:outline-dark-accent">
                  <span
                    aria-hidden="true"
                    className="w-9 shrink-0 text-center text-3xl font-bold leading-none tracking-tight tabular-nums text-secondary dark:text-dark-secondary">
                    {offset + i + 1}
                  </span>
                  {item.poster_path ? (
                    <img
                      className="h-16 w-11 shrink-0 rounded-md bg-dark-surface-3 object-cover"
                      src={mediaImageSrc(item.poster_path, "w185")}
                      alt=""
                      loading="lazy"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="flex h-16 w-11 shrink-0 items-center justify-center rounded-md bg-surface-2 dark:bg-dark-surface-3">
                      <Film className="h-5 w-5 text-secondary dark:text-dark-secondary" />
                    </span>
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold text-text-high dark:text-dark-text-high">
                      {mediaTitle(item)}
                    </span>
                    <span className="mt-0.5 flex items-center gap-2 text-xs tabular-nums text-text-low dark:text-dark-text-low">
                      {year ? <span>{year}</span> : null}
                      {rating ? (
                        <span className="inline-flex items-center gap-0.5 font-semibold text-accent-ink dark:text-dark-accent">
                          <Star className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                          <span className="sr-only">{isEs ? "Calificación" : "Rating"}</span>
                          {rating}
                        </span>
                      ) : null}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>

        {rail.length > 0 ? (
          <div className="relative mt-3">
            <RailArrow
              direction="prev"
              label={isEs ? "Desplazar a la izquierda" : "Scroll left"}
              onClick={() => scrollRail(-1)}
            />
            <ul
              ref={railRef}
              aria-label={isEs ? `Más: ${section.title}` : `More: ${section.title}`}
              className="-mx-2 flex snap-x snap-mandatory gap-3 overflow-x-auto overflow-y-hidden overscroll-x-contain px-2 py-3 [scrollbar-width:none] motion-safe:scroll-smooth [&::-webkit-scrollbar]:hidden [@media(hover:none)]:rail-fade">
              {rail.map((item) => (
                <li key={item.id} className="shrink-0 snap-start">
                  <LazyMediaContainer
                    media_={item}
                    type={section.type}
                    containerType="Minimal"
                  />
                </li>
              ))}
            </ul>
            <RailArrow
              direction="next"
              label={isEs ? "Desplazar a la derecha" : "Scroll right"}
              onClick={() => scrollRail(1)}
            />
          </div>
        ) : null}
      </div>
    </section>
  );
};

export { HomeSection };
