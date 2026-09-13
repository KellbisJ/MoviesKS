import React, { useState } from "react";
import { AdditionalMediaDataInterface } from "./types";
import { CreateMedia } from "../create-media";
import { CreateMediaImages } from "../create-media-images";
import { CreateMediaVideos } from "../create-media-videos";
import { CreateMediaReviews } from "../create-media-reviews";
import { WithSkeleton } from "@/components/utilities/loading-skeletons/WithSkeleton";

const AdditionalMediaData: React.FC<AdditionalMediaDataInterface> = ({
  loadingAdditionalMediaData,
  similarMedia,
  mediaType,
  mediaImages,
  mediaVideos,
  mediaReviews,
}) => {
  const MEDIA_TABS = [
    { id: "Similar", label: "Similar Content" },
    { id: "Images", label: "Images" },
    { id: "Videos", label: "Videos" },
    { id: "Reviews", label: "Reviews" },
  ] as const;

  type TabID = (typeof MEDIA_TABS)[number]["id"];

  const [activeTab, setActiveTab] = useState<TabID>("Images");

  return (
    <div className="mx-auto mt-32 w-full px-4 sm:px-6 lg:px-8">
      <section className="flex flex-col items-center">
        <WithSkeleton loading={loadingAdditionalMediaData}>
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 mt-8 w-full max-w-4xl">
            {MEDIA_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out cursor-pointer
                  ${
                    activeTab === tab.id
                      ? "bg-accent text-bg-main dark:bg-dark-accent dark:text-dark-bg-main shadow-md"
                      : "bg-surface-2 hover:bg-surface-1 dark:bg-dark-surface-2 dark:hover:bg-dark-surface-1 text-text-low hover:text-text-high dark:text-dark-text-low dark:hover:text-dark-text-high border border-secondary/20 dark:border-dark-secondary/20"
                  }`}>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="w-full max-w-6xl">
            {activeTab === "Similar" && (
              <CreateMedia media={similarMedia} type={mediaType} />
            )}
            {activeTab === "Images" && (
              <CreateMediaImages images={mediaImages} />
            )}
            {activeTab === "Videos" && (
              <CreateMediaVideos mediaVideos={mediaVideos} />
            )}
            {activeTab === "Reviews" && (
              <CreateMediaReviews
                mediaReviews={mediaReviews.results || []}
              />
            )}
          </div>
        </WithSkeleton>
      </section>
    </div>
  );
};

export { AdditionalMediaData };
