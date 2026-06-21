import React, { useEffect, useState } from "react";
import { MediaDetailPropsInterface } from "./types";
import { BigPosterPathNullSkeleton } from "@/components/utilities/loading-skeletons";
import { useSavedMedia } from "../../../context/favorite-media-context";
import { CreateSimilarGenres } from "../create-similar-genres";
import { TrailerMedia } from "../../modals/trailer-media";
import {
  Star,
  Save,
  Clapperboard,
  Globe,
  Film,
  Clock,
  Ticket,
} from "lucide-react";
import { memo } from "react";
import { MediaTypeT } from "@/types/media-type";
import { isSpanishLang } from "@/utils/is-spanish-lang";
import { useLanguages } from "@/context/lang";
import { UseHandleSaveMedia } from "@/hooks/use-handle-save-media";
import { MovieInterface, TVInterface } from "@/types/movie-and-tv-interface";
import { MediaImagesInterface } from "@/services/media-images/types";
import { MediaReviewInterface } from "@/services/reviews/types";
import { MediaVideosResultInterface } from "@/services/media-videos/types";
import { getSimilarMediaDetail } from "@/services/similar-media-detail";
import { getMediaVideos } from "@/services/media-videos";
import { getMediaImages } from "@/services/media-images";
import { getMediaReviews } from "@/services/reviews";
import { currentLanguage } from "@/context/lang";
import { AdditionalMediaData } from "../additional-media-data";

const MediaDetailRender: React.FC<MediaDetailPropsInterface> = memo(
  ({ mediaDetail, similarGenres, isMovie, mediaType, mediaId }) => {
    const { language } = useLanguages();
    const { savedMedia } = useSavedMedia();
    const allSavedMedia = [...savedMedia.movies, ...savedMedia.tv]; // This is to check is the media is saved whether is movie or tv
    const isSavedMedia = allSavedMedia.some(
      (favMedia) => favMedia.id === mediaDetail.id
    );

    const handleSaveMedia = UseHandleSaveMedia();

    const [loadingAdditionalMediaData, setLoadingAdditionalMediaData] =
      useState<boolean>(true);

    const [similarMedia, setSimilarMedia] = useState<
      MovieInterface[] | TVInterface[]
    >([]);
    const [mediaImages, setMediaImages] = useState<MediaImagesInterface>(
      {} as MediaImagesInterface
    );
    const [mediaVideos, setMediaVideos] = useState<
      MediaVideosResultInterface[]
    >([]);
    const [mediaReviews, setMediaReviews] = useState<MediaReviewInterface>(
      {} as MediaReviewInterface
    );

    const [showTrailer, setShowTrailer] = useState<boolean>(false);
    const [videoKey, setVideoKey] = useState<string>();

    useEffect(() => {
      const fetchMediaDetailAdditionalData = async () => {
        try {
          const [
            similarMediaData,
            mediaVideosData,
            mediaImagesData,
            mediaReviewsData,
          ] = await Promise.all([
            getSimilarMediaDetail(mediaType, mediaId),
            getMediaVideos(mediaType, mediaId),
            getMediaImages(mediaType, mediaId),
            getMediaReviews(mediaType, mediaId, currentLanguage),
          ]);
          setSimilarMedia(similarMediaData);

          if (mediaVideosData && mediaVideosData.results.length > 0) {
            const video = mediaVideosData.results.find(
              (video: any) =>
                video.type === "Trailer" ||
                video.type === "Teaser" ||
                (video.type === "Clip" && video.site === "YouTube")
            );
            if (video) {
              setVideoKey(video.key);
            }
            setMediaVideos(mediaVideosData.results);
          } else {
            setMediaVideos([]);
          }
          setMediaImages(mediaImagesData);
          setMediaReviews(mediaReviewsData);
        } catch (err) {
          console.error(err);
        } finally {
          setLoadingAdditionalMediaData(false);
        }
      };
      fetchMediaDetailAdditionalData();
    }, [mediaType, mediaId]);

    // New data points
    const productionCompanies = mediaDetail.production_companies || [];
    const spokenLanguages = mediaDetail.spoken_languages || [];
    const releaseDate = isMovie(mediaDetail)
      ? mediaDetail.release_date
      : mediaDetail.first_air_date;
    const runtime = isMovie(mediaDetail)
      ? `${mediaDetail.runtime} min`
      : mediaDetail.episode_run_time?.[0]
        ? `${mediaDetail.episode_run_time[0]} min/episode`
        : "N/A";

    const bigPoster = mediaDetail.backdrop_path || mediaDetail.poster_path;

    return (
      <section className="text-text-high dark:text-dark-text-high mx-auto px-6 lg:px-0 lg:-mt-8">
        <div className="relative mb-12 h-[90vh] lg:min-h-screen lg:h-auto">
          <picture className="absolute inset-0 -mx-6 lg:-mx-8 overflow-hidden">
            {bigPoster && (
              <img
                className="w-full h-full object-cover object-center shadow-2xl opacity-0 transition-opacity duration-500"
                src={`https://image.tmdb.org/t/p/w780/${bigPoster}`}
                alt="Backdrop"
                loading="eager"
                onLoad={(e) => (e.currentTarget.style.opacity = "1")}
              />
            )}
            <div className="absolute inset-0 bg-bg-main/80 dark:bg-dark-bg-main/80" />
            <div className="absolute bottom-0 w-full h-14 bg-linear-to-t from-surface-1 via-surface-1/20 dark:from-dark-surface-1 dark:via-dark-surface-1/20" />
          </picture>

          <article className="relative z-10 container mx-auto px-4 pb-4 lg:px-6 lg:pb-20 pt-12 sm:pt-20 opacity-100 h-full overflow-y-auto lg:overflow-visible">
            <div className="flex flex-col lg:flex-row gap-8 text-text-high dark:text-dark-text-high">
              <div className="w-full lg:w-1/3 xl:w-1/4 relative group">
                <div className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  {mediaDetail.poster_path ? (
                    <img
                      className="w-full h-auto aspect-2/3 object-cover opacity-0 transition-opacity duration-500"
                      src={`https://image.tmdb.org/t/p/w400/${mediaDetail.poster_path}`}
                      alt="Poster"
                      loading="eager"
                      onLoad={(e) => (e.currentTarget.style.opacity = "1")}
                    />
                  ) : (
                    <BigPosterPathNullSkeleton />
                  )}
                  <button
                    onClick={handleSaveMedia(mediaType, mediaDetail)}
                    className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm transition-all ${
                      isSavedMedia
                        ? "text-accent bg-accent/20 dark:bg-dark-accent/20"
                        : "text-text-high dark:text-dark-text-high hover:text-accent dark:hover:text-dark-accent bg-surface-1/30 dark:bg-dark-surface-1 hover:bg-accent/20 dark:hover:bg-dark-accent/20 cursor-pointer"
                    }`}>
                    <Save className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="flex-1 space-y-8">
                <div className="space-y-4">
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-high dark:text-dark-text-high">
                    {isMovie(mediaDetail)
                      ? mediaDetail.title
                      : mediaDetail.name}
                    <span className="ml-4 text-2xl font-normal text-text-low dark:text-dark-text-low">
                      ({new Date(releaseDate).getFullYear()})
                    </span>
                  </h1>

                  <div className="flex items-center flex-wrap gap-4">
                    <div className="flex items-center bg-surface-1/70 px-3 py-1 rounded-full backdrop-blur-sm border border-surface-2 dark:bg-dark-surface-1/70 dark:border-dark-surface-2">
                      <Star className="w-5 h-5 mr-1 text-accent" />
                      <span className="font-medium">
                        {mediaDetail.vote_average.toFixed(1)}
                      </span>
                      <span className="ml-2 text-text-low dark:text-dark-text-low">
                        ({mediaDetail.vote_count.toLocaleString()})
                      </span>
                    </div>

                    {videoKey && (
                      <button
                        onClick={() => setShowTrailer(true)}
                        className="flex items-center bg-accent hover:bg-accent/90 px-4 py-2 rounded-full transition-all">
                        <Clapperboard className="w-5 h-5 mr-2" />
                        {isSpanishLang(language)
                          ? "Ver Trailer"
                          : "Watch Trailer"}
                      </button>
                    )}
                  </div>

                  {mediaDetail.tagline && (
                    <p className="text-xl italic">"{mediaDetail.tagline}"</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Film className="w-5 h-5 text-accent" />
                    <span>
                      {mediaType === MediaTypeT.movie
                        ? isSpanishLang(language)
                          ? "Película"
                          : "Movie"
                        : mediaType === MediaTypeT.tv
                          ? isSpanishLang(language)
                            ? `Serie de TV`
                            : "TV serie"
                          : "mocoverde multimedia"}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-accent" />
                    <span>{runtime}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Ticket className="w-5 h-5 text-accent" />
                    <span>{mediaDetail.status}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Globe className="w-5 h-5 text-accent" />
                    <span>{mediaDetail.original_language.toUpperCase()}</span>
                  </div>

                  {isMovie(mediaDetail) && mediaDetail.budget > 0 && (
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">
                        {isSpanishLang(language) ? "Presupuesto:" : "Budget:"}
                      </span>
                      <span>${mediaDetail.budget.toLocaleString()}</span>
                    </div>
                  )}

                  {isMovie(mediaDetail) && mediaDetail.revenue > 0 && (
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">
                        {isSpanishLang(language)
                          ? "Recaudación:"
                          : "Revenue:"}{" "}
                      </span>
                      <span>${mediaDetail.revenue.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                {productionCompanies.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      {isSpanishLang(language)
                        ? "Empresas Productoras"
                        : "Production Companies"}
                    </h3>
                    <div className="flex flex-wrap gap-4">
                      {productionCompanies.map((company) =>
                        company.logo_path ? (
                          <img
                            key={company.id}
                            src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                            alt={company.name}
                            className="h-8 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                          />
                        ) : (
                          <span key={company.id} className="text-sm">
                            {company.name}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}

                {spokenLanguages.length > 1 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      {isSpanishLang(language)
                        ? "Lenguajes disponibles"
                        : "Available languages"}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {spokenLanguages.map((lang) =>
                        lang.name ? (
                          <span
                            key={lang.name}
                            className="p-2 min-w-20 w-20 max-w-28 text-sm text-center rounded-full bg-accent/10 text-accent">
                            {lang.english_name}
                          </span>
                        ) : (
                          <span
                            key={lang.name}
                            className="p-2 min-w-20 w-20 max-w-28 text-sm text-center rounded-full bg-accent/10 text-accent">
                            {lang.iso_639_1}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}

                {mediaDetail.overview && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      {isSpanishLang(language) ? "Sinopsis" : "Synopsis"}
                    </h3>
                    <p className="leading-relaxed">{mediaDetail.overview}</p>
                  </div>
                )}

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    {isSpanishLang(language)
                      ? "Géneros similares"
                      : "Similar genres"}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <CreateSimilarGenres
                      genres={similarGenres}
                      type={mediaType}
                    />
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>

        <AdditionalMediaData
          loadingAdditionalMediaData={loadingAdditionalMediaData}
          similarMedia={similarMedia}
          mediaType={mediaType}
          mediaImages={mediaImages}
          mediaVideos={mediaVideos}
          mediaReviews={mediaReviews}
        />

        <TrailerMedia
          isOpen={showTrailer}
          onClose={() => setShowTrailer(false)}
          videoKey={videoKey as string}
        />
      </section>
    );
  }
);

export { MediaDetailRender };
