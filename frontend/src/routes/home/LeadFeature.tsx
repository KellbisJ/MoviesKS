import { Link } from "react-router-dom";
import { Bookmark, BookmarkCheck, Film, Star } from "lucide-react";
import { MediaTypeT } from "@/types/media-type";
import { mediaImageSrc } from "@/utils/media-image-src";
import { useSavedMedia } from "@/context/favorite-media-context";
import { UseHandleSaveMedia } from "@/hooks/use-handle-save-media";
import { HomeMediaItem } from "./types";
import { mediaRating, mediaTitle, mediaYear } from "./media-fields";

interface LeadFeatureProps {
  item: HomeMediaItem;
  type: MediaTypeT;
  isEs: boolean;
}

/**
 * The page's one "tonight's feature": the most popular movie, full width.
 * The title link stretches over the whole frame; the save button sits above it.
 */
const LeadFeature = ({ item, type, isEs }: LeadFeatureProps) => {
  const { savedMedia } = useSavedMedia();
  const handleSaveMedia = UseHandleSaveMedia();

  const title = mediaTitle(item);
  const year = mediaYear(item);
  const rating = mediaRating(item);
  const backdrop = item.backdrop_path ?? item.poster_path;
  const poster = item.poster_path ?? item.backdrop_path;
  const track = type === MediaTypeT.movie ? "movies" : MediaTypeT.tv;
  const isSaved = (savedMedia[track] || []).some((saved) => saved.id === item.id);

  return (
    <article className="group relative isolate grid overflow-hidden rounded-[20px] bg-dark-surface-1 shadow-lg transition-shadow duration-300 hover:shadow-2xl focus-within:shadow-2xl">
      <div className="[grid-area:1/1] aspect-[4/5] w-full sm:aspect-video lg:aspect-auto lg:h-[min(62vh,600px)]">
        {backdrop ? (
          <picture>
            <source media="(min-width: 640px)" srcSet={mediaImageSrc(backdrop, "w1280")} />
            <img
              className="h-full w-full object-cover object-top motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:scale-[1.02]"
              src={mediaImageSrc(poster, "w500")}
              alt=""
              fetchPriority="high"
            />
          </picture>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-dark-surface-2">
            <Film className="h-16 w-16 text-dark-secondary" aria-hidden="true" />
          </div>
        )}
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/5 lg:bg-gradient-to-r lg:from-black/85 lg:via-black/45 lg:to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 hidden h-1/2 bg-gradient-to-t from-black/60 to-transparent lg:block"
      />

      {/* Static grid item (z-index works without positioning) so the stretched link resolves to <article> */}
      <div className="[grid-area:1/1] z-[1] self-end p-5 pb-12 sm:p-8 sm:pb-14 lg:max-w-3xl lg:p-12 lg:pb-16">
        <h2 className="text-3xl font-bold leading-[1.05] tracking-tight text-balance text-white sm:text-4xl lg:text-6xl">
          <Link
            to={`/${type}/detail/${item.id}`}
            className="outline-none after:absolute after:inset-0 after:rounded-[20px] focus-visible:after:outline-2 focus-visible:after:-outline-offset-4 focus-visible:after:outline-dark-accent">
            {title}
          </Link>
        </h2>

        <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/80 md:text-base">
          {rating ? (
            <span className="inline-flex items-center gap-1 font-semibold tabular-nums text-dark-accent">
              <Star className="h-4 w-4 fill-current" aria-hidden="true" />
              <span className="sr-only">{isEs ? "Calificación" : "Rating"}</span>
              {rating}
            </span>
          ) : null}
          {year ? <span className="tabular-nums">{year}</span> : null}
          <span>{isEs ? "N.º 1 en películas populares" : "No. 1 in popular movies"}</span>
        </p>

        {item.overview ? (
          <p className="mt-3 max-w-[62ch] text-sm leading-relaxed text-white/85 line-clamp-3 sm:line-clamp-2 md:text-base">
            {item.overview}
          </p>
        ) : null}

        <div className="mt-5 flex flex-wrap items-center gap-3">
          {/* Visual CTA only: the stretched title link already covers this area */}
          <span
            aria-hidden="true"
            className="inline-flex items-center rounded-full bg-dark-accent px-5 py-2.5 text-sm font-semibold text-dark-bg-main transition-colors duration-200 group-hover:bg-[color-mix(in_srgb,var(--color-dark-accent)_88%,white)]">
            {isEs ? "Ver detalles" : "View details"}
          </span>
          <button
            type="button"
            onClick={handleSaveMedia(type, item)}
            aria-pressed={isSaved}
            className={`relative z-10 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold backdrop-blur-sm cursor-pointer transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-accent ${
              isSaved
                ? "bg-white text-dark-bg-main"
                : "bg-white/15 text-white hover:bg-white/25"
            }`}>
            {isSaved ? (
              <BookmarkCheck className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Bookmark className="h-4 w-4" aria-hidden="true" />
            )}
            {isSaved ? (isEs ? "Guardada" : "Saved") : isEs ? "Guardar" : "Save"}
          </button>
        </div>
      </div>
    </article>
  );
};

export { LeadFeature };
