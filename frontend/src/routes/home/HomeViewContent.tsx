import React, { memo } from "react";
import { CreateMedia } from "@/components/specific/create-media";
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
                  <h3 className="text-gray-700 dark:text-gray-300">
                    {section.title}
                  </h3>
                  {isLoadingMedia ? (
                    <MediaHomeSkeleton />
                  ) : isErrorCatched ? (
                    <MediaHomeErrorSkeleton />
                  ) : (
                    <CreateMedia
                      type={section.type}
                      media={section.media}
                      section="Home"
                    />
                  )}
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
