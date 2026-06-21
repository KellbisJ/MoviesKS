import React, { useEffect, useState } from "react";
import { CreateMedia } from "../../components/specific/create-media";
import { useSavedMedia } from "../../context/favorite-media-context";
import { MediaSavedVoid } from "../../components/utilities/loading-skeletons";
import { PopcornParticlesLoader } from "../../components/utilities/loaders-animation";
import { MediaTypeT } from "@/types/media-type";
import { isSpanishLang } from "@/utils/is-spanish-lang";
import { useLanguages } from "@/context/lang";

const SavedMedia = (): React.JSX.Element => {
  const { language } = useLanguages();
  const [loadingComponents, setLoadingComponents] = useState<boolean>(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timeoutId = setTimeout(() => {
      setLoadingComponents(false);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, []);

  const { savedMedia } = useSavedMedia();

  const hasMovies = savedMedia.movies.length > 0;
  const hasShows = savedMedia.tv.length > 0;

  const LocalStorageText = React.createElement(
    "span",
    { className: "text-accent dark:text-dark-accent" },
    "Local Storage"
  );

  return (
    <>
      {loadingComponents ? (
        <PopcornParticlesLoader />
      ) : (
        <>
          <div className="max-w-[1536px] mx-auto">
            <div className="mb-12 flex flex-col gap-2 p-3">
              <h1 className="text-2xl sm:text-3xl font-bold text-text-high dark:text-dark-text-high">
                {isSpanishLang(language)
                  ? "Mis medios guardados"
                  : "My Saved Media"}
              </h1>
              <p className="text-text-low dark:text-dark-text-low">
                {isSpanishLang(language) ? (
                  <>
                    Temporal, según el dispositivo digital. Este contenido se
                    guarda en el {LocalStorageText}.
                  </>
                ) : (
                  <>
                    Temporary, depending on the digital device. This media is
                    saved in the {LocalStorageText}.
                  </>
                )}
              </p>
            </div>

            <section aria-labelledby="movies-section" className="mb-12">
              <h2
                id="movies-section"
                className="text-2xl font-semibold text-text-high dark:text-dark-text-high mb-8 p-3">
                {isSpanishLang(language) ? "Películas" : "Movies"}
              </h2>
              {hasMovies ? (
                <CreateMedia
                  media={savedMedia.movies}
                  type={MediaTypeT.movie}
                />
              ) : (
                <MediaSavedVoid />
              )}
            </section>

            <section aria-labelledby="tv-section">
              <h2
                id="tv-section"
                className="text-2xl font-semibold text-text-high dark:text-dark-text-high mb-8 p-3">
                {isSpanishLang(language) ? "Series de TV" : "TV series"}
              </h2>
              {hasShows ? (
                <CreateMedia media={savedMedia.tv} type={MediaTypeT.tv} />
              ) : (
                <MediaSavedVoid />
              )}
            </section>
          </div>
        </>
      )}
    </>
  );
};

export { SavedMedia };
