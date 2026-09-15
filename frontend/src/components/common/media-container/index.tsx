import React, { memo } from "react";
import { Link } from "react-router-dom";
import { useSavedMedia } from "../../../context/favorite-media-context";
import {
  MediaNullSkeleton,
  MediaNullSkeletonHome,
} from "@/components/utilities/loading-skeletons";
import { Bookmark, BookmarkCheck, Star } from "lucide-react";
import {
  MovieInterface,
  TVInterface,
} from "../../../types/movie-and-tv-interface";
import { MediaContainerPropsInterface } from "./types";
import {
  MovieDetailInterface,
  TVDetailInterface,
} from "@/services/media-detail/types";
import { MediaTypeT } from "@/types/media-type";
import { UseHandleSaveMedia } from "@/hooks/use-handle-save-media";
import { mediaImageSrc } from "@/utils/media-image-src";
import { useLanguages } from "@/context/lang";
import { isSpanishLang } from "@/utils/is-spanish-lang";

const isMovie = (
  media: MovieInterface | TVInterface | MovieDetailInterface | TVDetailInterface
): media is MovieInterface | MovieDetailInterface => {
  return (media as MovieInterface | MovieDetailInterface).title !== undefined;
};

const MediaContainer: React.FC<MediaContainerPropsInterface> = memo(
  ({ media_, type, variant }) => {
    const { savedMedia } = useSavedMedia();
    const { language } = useLanguages();
    const isEs = isSpanishLang(language);
    const favoriteMedia =
      savedMedia[type === MediaTypeT.movie ? "movies" : MediaTypeT.tv] || [];
    const isFavorite = favoriteMedia.some(
      (favMedia) => favMedia.id === media_.id
    );

    const handleSaveMedia = UseHandleSaveMedia();

    const isMinimal = variant === "Minimal";
    const title = isMovie(media_) ? media_.title : media_.name;
    const rating = media_.vote_average?.toFixed(1);
    const imgSize = isMinimal ? "w185" : "w342";

    const containerClasses = isMinimal
      ? "group relative w-full h-full rounded-lg p-2 animate-fade-in motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:scale-105"
      : "group relative w-full h-full flex flex-col animate-fade-in";
    const aspectClass = isMinimal
      ? "h-full w-full object-cover aspect-[2/3]"
      : "w-full h-full object-cover aspect-[2/3]";

    const saveLabel = isFavorite
      ? isEs
        ? `Quitar ${title} de guardados`
        : `Remove ${title} from saved`
      : isEs
        ? `Guardar ${title}`
        : `Save ${title}`;

    return (
      <div className={containerClasses} style={{ touchAction: "manipulation" }}>
        {media_.poster_path === null ? (
          isMinimal ? (
            <MediaNullSkeletonHome data={media_} type={type} title={title} />
          ) : (
            <MediaNullSkeleton data={media_} type={type} title={title} />
          )
        ) : (
          <Link
            to={`/${type}/detail/${media_.id}`}
            className="block w-full h-full relative overflow-hidden rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:focus-visible:outline-dark-accent">
            <img
              className={`${aspectClass} opacity-0 transition-opacity duration-500 bg-dark-surface-2`}
              alt={title}
              src={mediaImageSrc(media_.poster_path, imgSize)}
              loading="lazy"
              onLoad={(e) => (e.currentTarget.style.opacity = "1")}
            />
            {rating ? (
              <span className="sr-only">
                {isEs ? `, calificación ${rating}` : `, rated ${rating}`}
              </span>
            ) : null}

            {/* Title and rating stay readable at rest; hover only deepens the scrim */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-2.5 pt-10 pb-2.5 transition-[padding] duration-300 group-hover:pt-16">
              <span className="line-clamp-2 text-left text-xs font-semibold leading-snug text-white md:text-sm">
                {title}
              </span>
              {rating ? (
                <span className="inline-flex shrink-0 items-center gap-0.5 text-xs font-semibold tabular-nums text-dark-accent">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  {rating}
                </span>
              ) : null}
            </div>
          </Link>
        )}

        <button
          type="button"
          onClick={handleSaveMedia(type, media_)}
          aria-label={saveLabel}
          aria-pressed={isFavorite}
          className={`absolute z-10 inline-flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-sm cursor-pointer transition-[opacity,background-color,color] duration-200 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:focus-visible:outline-dark-accent ${
            isMinimal ? "top-3.5 right-3.5" : "top-2 right-2"
          } ${
            isFavorite
              ? "bg-accent text-white dark:bg-dark-accent dark:text-dark-bg-main"
              : "bg-black/45 text-white hover:bg-accent dark:hover:bg-dark-accent dark:hover:text-dark-bg-main [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-within:opacity-100"
          }`}>
          {isFavorite ? (
            <BookmarkCheck className="w-5 h-5" aria-hidden="true" />
          ) : (
            <Bookmark className="w-5 h-5" aria-hidden="true" />
          )}
        </button>
      </div>
    );
  }
);

export { MediaContainer };
