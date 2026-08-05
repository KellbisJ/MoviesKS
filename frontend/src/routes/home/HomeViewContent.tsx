import React, { memo } from "react";
import { CreateMedia } from "@/components/specific/create-media";
import { LazyMediaContainer } from "@/components/common/lazy-media-container";
import {
  MediaHomeSkeleton,
  MediaHomeErrorSkeleton,
} from "@/components/utilities/loading-skeletons";
import { HomeViewContentInterfaceProps } from "./types";
import { PopcornParticlesLoader } from "@/components/utilities/loaders-animation";
import { MksHeaderContent } from "@/components/common/mks-header-content";
import { SearchBar } from "@/components/common/search-bar";

const HomeViewContent: React.FC<HomeViewContentInterfaceProps> = memo(
  ({
    isLoadingComponents,
    isLoadingMedia,
    isErrorCatched,
    mediaSectionData,
  }) => {
    return (
      <>
        {isLoadingComponents ? (
          <PopcornParticlesLoader />
        ) : (
          <div className="min-h-screen flex justify-center items-start">
            <div className="container mx-auto px-4 sm:px-6 py-3 translate-z-0 overscroll-x-contain">
              <MksHeaderContent />
              <SearchBar />
              {mediaSectionData.map((section, index) => (
                <section
                  key={`${section.type}-${index}`}
                  className="space-y-2 mt-12"
                  role="region"
                  lang="es">
                  <h2 className="home-section-header text-primary dark:text-dark-primary">
                    {section.title}
                  </h2>
                  {isLoadingMedia ? (
                    <MediaHomeSkeleton />
                  ) : isErrorCatched ? (
                    <MediaHomeErrorSkeleton />
                  ) : section.media && section.media.length > 0 ? (
                    <>
                      <div className="home-featured-card relative overflow-hidden rounded-xl">
                        <a href={`/${section.type}/detail/${section.media[0].id}`} className="block">
                          <img
                            src={`https://image.tmdb.org/t/p/original${section.media[0].backdrop_path}`}
                            alt={section.media[0].title || section.media[0].name}
                            loading="lazy"
                          />
                        </a>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 md:p-6">
                          <h3 className="text-white text-lg md:text-xl font-bold mb-1">{section.media[0].title || section.media[0].name}</h3>
                          <div className="flex items-center gap-2 text-white/70 text-sm">
                            <span className="flex items-center gap-1">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star" style={{ color: "#facc15" }}><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>
                              {section.media[0].vote_average?.toFixed(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="home-scroll-row">
                        {section.media.slice(1).map((item, i) => (
                          <div key={`${item.id}-${i}`} className="home-card-inner">
                            <LazyMediaContainer
                              key={item.id}
                              media_={item}
                              type={section.type}
                              containerType="Minimal"
                            />
                          </div>
                        ))}
                      </div>
                    </>
                  ) : null}
                </section>
              ))}
            </div>
          </div>
        )}
      </>
    );
  }
);

export { HomeViewContent };
