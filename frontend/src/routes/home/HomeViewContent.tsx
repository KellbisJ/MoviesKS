import React, { memo } from "react";
import { RotateCw, TriangleAlert } from "lucide-react";
import { SearchBar } from "@/components/common/search-bar";
import { useLanguages } from "@/context/lang";
import { isSpanishLang } from "@/utils/is-spanish-lang";
import { HomeViewContentInterfaceProps } from "./types";
import { LeadFeature } from "./LeadFeature";
import { HomeSection } from "./HomeSection";
import { HomeSkeleton } from "./HomeSkeleton";

const HomeViewContent: React.FC<HomeViewContentInterfaceProps> = memo(
  ({ isLoadingMedia, mediaSectionData, onRetry }) => {
    const { language } = useLanguages();
    const isEs = isSpanishLang(language);

    // The lead is the most popular movie; its section then starts at rank 2.
    const leadSection = mediaSectionData[0];
    const lead = leadSection?.media[0];

    const failedCount = mediaSectionData.filter((s) => s.failed).length;
    const allFailed = failedCount === mediaSectionData.length;

    const visibleSections = mediaSectionData
      .map((section, index) => ({
        section,
        offset: index === 0 && lead ? 1 : 0,
      }))
      .filter(({ section, offset }) => section.media.length > offset);

    const nothingToShow = !allFailed && failedCount === 0 && visibleSections.length === 0;

    return (
      <div className="container mx-auto px-4 pt-3 pb-10 sm:px-6">
        <h1 className="sr-only">
          {isEs
            ? "MoviesKS: descubre películas y series"
            : "MoviesKS: discover movies and TV series"}
        </h1>

        {isLoadingMedia ? (
          <HomeSkeleton isEs={isEs} />
        ) : (
          <>
            {lead ? (
              <LeadFeature item={lead} type={leadSection.type} isEs={isEs} />
            ) : null}

            <div className={`relative z-10 ${lead ? "-mt-7 sm:-mt-8" : "mt-2"}`}>
              <SearchBar />
            </div>

            {failedCount > 0 ? (
              <div
                role="alert"
                className="mx-auto mt-8 flex max-w-3xl flex-col gap-4 rounded-xl bg-surface-1 px-5 py-4 text-sm text-text-high shadow-sm dark:bg-dark-surface-1 dark:text-dark-text-high sm:flex-row sm:items-center">
                <TriangleAlert
                  className="h-5 w-5 shrink-0 text-accent-ink dark:text-dark-accent"
                  aria-hidden="true"
                />
                <p className="flex-1 text-text-low dark:text-dark-text-low">
                  {allFailed
                    ? isEs
                      ? "No pudimos cargar la cartelera: el servidor de títulos no respondió."
                      : "We couldn't load any titles: the title server didn't respond."
                    : isEs
                      ? `${failedCount === 1 ? "Una sección no cargó" : `${failedCount} secciones no cargaron`}; el resto está disponible abajo.`
                      : `${failedCount === 1 ? "One section didn't load" : `${failedCount} sections didn't load`}; everything else is below.`}
                </p>
                <button
                  type="button"
                  onClick={onRetry}
                  className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full bg-accent-ink px-5 py-2 font-semibold text-white cursor-pointer transition-colors duration-200 hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:bg-dark-accent dark:text-dark-bg-main dark:hover:bg-dark-primary dark:focus-visible:outline-dark-accent sm:self-auto">
                  <RotateCw className="h-4 w-4" aria-hidden="true" />
                  {isEs ? "Reintentar" : "Try again"}
                </button>
              </div>
            ) : null}

            {nothingToShow ? (
              <p className="mt-10 text-center text-text-low dark:text-dark-text-low">
                {isEs
                  ? "No hay títulos para mostrar ahora mismo. Prueba a buscar uno."
                  : "There are no titles to show right now. Try searching for one."}
              </p>
            ) : null}

            {visibleSections.map(({ section, offset }) => (
              <HomeSection
                key={section.id}
                section={section}
                offset={offset}
                isEs={isEs}
              />
            ))}
          </>
        )}
      </div>
    );
  }
);

export { HomeViewContent };
