import React, { useState } from "react";
import { AdditionalMediaDataInterface } from "./types";
import { CreateMedia } from "../create-media";
import { CreateMediaImages } from "../create-media-images";
import { CreateMediaVideos } from "../create-media-videos";
import { CreateMediaReviews } from "../create-media-reviews";

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
    <div className="mx-auto mt-32">
      <section className="flex flex-col items-center">
        {!loadingAdditionalMediaData ? (
          <>
            {/* Tab Navigation */}
            <div className="flex flex-wrap justify-center gap-2 mb-14 mt-8 px-4">
              {MEDIA_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out cursor-pointer
                    ${
                      activeTab === tab.id
                        ? "bg-accent text-surface-3 dark:bg-dark-accent dark:text-dark-surface-3 shadow-md"
                        : "bg-surface-2 hover:bg-surface-1 dark:bg-dark-surface-2 dark:hover:bg-dark-surface-1 text-text-low dark:text-dark-text-low"
                    }`}>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="w-full max-w-6xl px-4">
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
                <CreateMediaReviews mediaReviews={mediaReviews.results} />
              )}
            </div>
          </>
        ) : (
          /* Loading State */
          <div className="w-full max-w-6xl px-4 py-16">
            <div className="animate-pulse flex flex-col space-y-4">
              <div className="h-8 bg-surface-2 dark:bg-dark-surface-2 rounded w-1/3"></div>
              <div className="h-4 bg-surface-2 dark:bg-dark-surface-2 rounded w-full"></div>
              <div className="h-4 bg-surface-2 dark:bg-dark-surface-2 rounded w-5/6"></div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export { AdditionalMediaData };
