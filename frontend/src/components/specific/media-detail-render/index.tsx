import React, { memo, useState } from "react";
import {
  Bookmark,
  BookmarkCheck,
  Clapperboard,
  Clock,
  Film,
  Globe,
  Star,
  Ticket,
} from "lucide-react";
import { MediaDetailPropsInterface } from "./types";
import { BigPosterPathNullSkeleton } from "@/components/utilities/loading-skeletons";
import { useSavedMedia } from "@/context/favorite-media-context";
import { useLanguages } from "@/context/lang";
import { UseHandleSaveMedia } from "@/hooks/use-handle-save-media";
import { MediaTypeT } from "@/types/media-type";
import { mediaImageSrc } from "@/utils/media-image-src";
import { CreateSimilarGenres } from "../create-similar-genres";
import { TrailerMedia } from "../../modals/trailer-media";
import { AdditionalMediaData } from "../additional-media-data";
import {
  formatMoney,
  isMovieDetail,
  languageName,
  localeFor,
  mediaTitle,
  mediaYear,
  runtimeLabel,
  statusLabel,
} from "./detail-copy";
import { pickTrailer, useMediaExtras } from "./use-media-extras";

const sectionHeading = "text-lg font-semibold text-text-high dark:text-dark-text-high";

const Fact = ({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Film;
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex items-center gap-2">
    <Icon className="h-5 w-5 shrink-0 text-secondary dark:text-dark-secondary" aria-hidden="true" />
    <span className="sr-only">{label}:</span>
    <span>{children}</span>
  </div>
);

const MediaDetailRender: React.FC<MediaDetailPropsInterface> = memo(
  ({ media, mediaType, mediaId, isEs }) => {
    const { language } = useLanguages();
    const { savedMedia } = useSavedMedia();
    const handleSaveMedia = UseHandleSaveMedia();
    const extras = useMediaExtras(mediaType, mediaId, language);
    const [showTrailer, setShowTrailer] = useState(false);

    // Movie and TV ids overlap, so only look in this title's own track.
    const track = mediaType === MediaTypeT.movie ? "movies" : MediaTypeT.tv;
    const isSaved = (savedMedia[track] || []).some((saved) => saved.id === media.id);

    const title = mediaTitle(media);
    const year = mediaYear(media);
    const runtime = runtimeLabel(media, isEs);
    const status = statusLabel(media.status, isEs);
    const originalLanguage = languageName(media.original_language, isEs);
    const trailer = pickTrailer(extras.videos.data ?? []);
    const locale = localeFor(isEs);

    const genres = media.genres ?? [];
    const productionCompanies = media.production_companies ?? [];
    const spokenLanguages = media.spoken_languages ?? [];
    const budget = isMovieDetail(media) && media.budget > 0 ? media.budget : null;
    const revenue = isMovieDetail(media) && media.revenue > 0 ? media.revenue : null;
    const hasDetails =
      budget !== null || revenue !== null || productionCompanies.length > 0 || spokenLanguages.length > 0;

    const backdrop = media.backdrop_path || media.poster_path;
    const hasRating = typeof media.vote_average === "number" && media.vote_count > 0;

    return (
      <section className="text-text-high dark:text-dark-text-high mx-auto px-6 lg:px-0 lg:-mt-8">
        {/* min-h, not h: a fixed height made the hero a scroll box inside the page on phones. */}
        <div className="relative mb-12 min-h-[90vh] lg:min-h-screen">
          <picture className="absolute inset-0 -mx-6 lg:-mx-8 overflow-hidden" aria-hidden="true">
            {backdrop && (
              <>
                <source media="(min-width: 1024px)" srcSet={mediaImageSrc(backdrop, "w1280")} />
                <img
                  className="w-full h-full object-cover object-center shadow-2xl opacity-0 transition-opacity duration-500"
                  src={mediaImageSrc(backdrop, "w780")}
                  alt=""
                  fetchPriority="high"
                  onLoad={(e) => (e.currentTarget.style.opacity = "1")}
                />
              </>
            )}
            <div className="absolute inset-0 bg-bg-main/80 dark:bg-dark-bg-main/80" />
            <div className="absolute bottom-0 w-full h-14 bg-linear-to-t from-surface-1 via-surface-1/20 dark:from-dark-surface-1 dark:via-dark-surface-1/20" />
          </picture>

          <article className="relative z-10 container mx-auto px-4 pb-4 lg:px-6 lg:pb-20 pt-12 sm:pt-20">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-1/3 xl:w-1/4 relative">
                <div className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  {media.poster_path ? (
                    <img
                      className="w-full h-auto aspect-2/3 object-cover opacity-0 transition-opacity duration-500"
                      src={mediaImageSrc(media.poster_path, "w500")}
                      alt={isEs ? `Póster de ${title}` : `${title} poster`}
                      fetchPriority="high"
                      onLoad={(e) => (e.currentTarget.style.opacity = "1")}
                    />
                  ) : (
                    <BigPosterPathNullSkeleton />
                  )}
                  <button
                    type="button"
                    onClick={handleSaveMedia(mediaType, media)}
                    aria-pressed={isSaved}
                    aria-label={
                      isSaved
                        ? isEs ? `Quitar ${title} de guardados` : `Remove ${title} from saved`
                        : isEs ? `Guardar ${title}` : `Save ${title}`
                    }
                    title={isSaved ? (isEs ? "Guardada" : "Saved") : isEs ? "Guardar" : "Save"}
                    className={`absolute top-3 right-3 flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-sm cursor-pointer transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:focus-visible:outline-dark-accent ${
                      isSaved
                        ? "bg-accent-ink text-white dark:bg-dark-accent dark:text-dark-bg-main"
                        : "bg-surface-3/80 text-text-high hover:bg-surface-3 dark:bg-dark-surface-1/80 dark:text-dark-text-high dark:hover:bg-dark-surface-1"
                    }`}>
                    {isSaved ? (
                      <BookmarkCheck className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <Bookmark className="h-5 w-5" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex-1 min-w-0 space-y-8">
                <div className="space-y-4">
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance break-words">
                    {title}
                    {year !== null ? (
                      <>
                        {" "}
                        <span className="whitespace-nowrap text-2xl font-normal tabular-nums text-text-low dark:text-dark-text-low">
                          ({year})
                        </span>
                      </>
                    ) : null}
                  </h1>

                  <div className="flex items-center flex-wrap gap-3">
                    {hasRating ? (
                      <p className="flex items-center gap-1.5 rounded-full bg-surface-1/70 px-3 py-2 text-sm backdrop-blur-sm dark:bg-dark-surface-1/70">
                        <Star className="h-4 w-4 fill-current text-accent-ink dark:text-dark-accent" aria-hidden="true" />
                        <span className="sr-only">{isEs ? "Calificación:" : "Rating:"}</span>
                        <span className="font-semibold tabular-nums">{media.vote_average.toFixed(1)}</span>
                        <span className="tabular-nums text-text-low dark:text-dark-text-low">
                          ({media.vote_count.toLocaleString(locale)}{" "}
                          {isEs
                            ? media.vote_count === 1 ? "voto" : "votos"
                            : media.vote_count === 1 ? "vote" : "votes"}
                          )
                        </span>
                      </p>
                    ) : null}

                    {trailer ? (
                      <button
                        type="button"
                        onClick={() => setShowTrailer(true)}
                        aria-haspopup="dialog"
                        className="inline-flex items-center gap-2 rounded-full bg-accent-ink px-5 py-2.5 text-sm font-semibold text-white cursor-pointer transition-colors duration-200 hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:bg-dark-accent dark:text-dark-bg-main dark:hover:bg-dark-primary dark:focus-visible:outline-dark-accent">
                        <Clapperboard className="h-4 w-4" aria-hidden="true" />
                        {isEs ? "Ver tráiler" : "Watch trailer"}
                      </button>
                    ) : null}
                  </div>

                  {media.tagline ? (
                    <p className="text-xl italic text-text-low dark:text-dark-text-low">“{media.tagline}”</p>
                  ) : null}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Fact icon={Film} label={isEs ? "Tipo" : "Type"}>
                    {mediaType === MediaTypeT.movie
                      ? isEs ? "Película" : "Movie"
                      : isEs ? "Serie de TV" : "TV series"}
                  </Fact>
                  {runtime ? (
                    <Fact icon={Clock} label={isEs ? "Duración" : "Runtime"}>
                      {runtime}
                    </Fact>
                  ) : null}
                  {status ? (
                    <Fact icon={Ticket} label={isEs ? "Estado" : "Status"}>
                      {status}
                    </Fact>
                  ) : null}
                  {originalLanguage ? (
                    <Fact icon={Globe} label={isEs ? "Idioma original" : "Original language"}>
                      {originalLanguage}
                    </Fact>
                  ) : null}
                </div>

                {media.overview ? (
                  <div className="space-y-3">
                    <h2 className={sectionHeading}>{isEs ? "Sinopsis" : "Synopsis"}</h2>
                    <p className="max-w-[70ch] leading-relaxed">{media.overview}</p>
                  </div>
                ) : null}

                {genres.length > 0 ? (
                  <div className="space-y-3">
                    <h2 className={sectionHeading}>{isEs ? "Géneros" : "Genres"}</h2>
                    <ul className="flex flex-wrap gap-2">
                      <CreateSimilarGenres genres={genres} type={mediaType} />
                    </ul>
                  </div>
                ) : null}

                {hasDetails ? (
                  <div className="space-y-3">
                    <h2 className={sectionHeading}>{isEs ? "Detalles" : "Details"}</h2>
                    <dl className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                      {budget !== null ? (
                        <div>
                          <dt className="text-sm text-text-low dark:text-dark-text-low">
                            {isEs ? "Presupuesto" : "Budget"}
                          </dt>
                          <dd className="font-semibold tabular-nums">{formatMoney(budget, isEs)}</dd>
                        </div>
                      ) : null}
                      {revenue !== null ? (
                        <div>
                          <dt className="text-sm text-text-low dark:text-dark-text-low">
                            {isEs ? "Recaudación" : "Box office"}
                          </dt>
                          <dd className="font-semibold tabular-nums">{formatMoney(revenue, isEs)}</dd>
                        </div>
                      ) : null}
                      {productionCompanies.length > 0 ? (
                        <div className="sm:col-span-2">
                          <dt className="mb-2 text-sm text-text-low dark:text-dark-text-low">
                            {isEs ? "Productoras" : "Production companies"}
                          </dt>
                          <dd>
                            <ul className="flex flex-wrap items-center gap-2">
                              {productionCompanies.map((company) => (
                                <li key={company.id}>
                                  {company.logo_path ? (
                                    // Most logos are dark artwork; a light plate keeps them visible in dark mode.
                                    <span className="flex h-10 items-center rounded-lg bg-surface-3 px-3 shadow-sm dark:bg-dark-primary">
                                      <img
                                        src={mediaImageSrc(company.logo_path, "w185")}
                                        alt={company.name}
                                        title={company.name}
                                        loading="lazy"
                                        className="h-6 w-auto max-w-32 object-contain"
                                      />
                                    </span>
                                  ) : (
                                    <span className="flex h-10 items-center rounded-lg bg-surface-2 px-3 text-sm dark:bg-dark-surface-2">
                                      {company.name}
                                    </span>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </dd>
                        </div>
                      ) : null}
                      {spokenLanguages.length > 0 ? (
                        <div className="sm:col-span-2">
                          <dt className="mb-2 text-sm text-text-low dark:text-dark-text-low">
                            {isEs ? "Idiomas hablados" : "Spoken languages"}
                          </dt>
                          <dd>
                            <ul className="flex flex-wrap gap-2">
                              {spokenLanguages.map((lang) => (
                                <li
                                  key={lang.iso_639_1}
                                  className="rounded-full bg-surface-2 px-3 py-1.5 text-sm dark:bg-dark-surface-2">
                                  {languageName(lang.iso_639_1, isEs, lang.english_name)}
                                </li>
                              ))}
                            </ul>
                          </dd>
                        </div>
                      ) : null}
                    </dl>
                  </div>
                ) : null}
              </div>
            </div>
          </article>
        </div>

        <AdditionalMediaData extras={extras} mediaType={mediaType} title={title} isEs={isEs} />

        <TrailerMedia
          isOpen={showTrailer}
          onClose={() => setShowTrailer(false)}
          videoKey={trailer?.key}
          title={trailer?.name || title}
          isEs={isEs}
        />
      </section>
    );
  }
);

export { MediaDetailRender };
