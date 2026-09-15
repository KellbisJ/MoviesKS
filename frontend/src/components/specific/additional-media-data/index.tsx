import React, { useId, useRef, useState } from "react";
import { RotateCw } from "lucide-react";
import { AdditionalMediaDataInterface } from "./types";
import { CreateMediaImages } from "../create-media-images";
import { CreateMediaVideos } from "../create-media-videos";
import { CreateMediaReviews } from "../create-media-reviews";
import { LazyMediaContainer } from "@/components/common/lazy-media-container";
import { RailArrow } from "@/components/common/rail-arrow";
import { ShimmerBox } from "@/components/utilities/loading-skeletons/ShimmerBox";

type TabID = "images" | "videos" | "reviews";
const TABS: TabID[] = ["images", "videos", "reviews"];

const tabLabel = (tab: TabID, isEs: boolean) => {
  switch (tab) {
    case "images":
      return isEs ? "Imágenes" : "Images";
    case "videos":
      return isEs ? "Videos" : "Videos";
    case "reviews":
      return isEs ? "Reseñas" : "Reviews";
  }
};

const SectionError = ({ message, onRetry, isEs }: { message: string; onRetry: () => void; isEs: boolean }) => (
  <div
    role="alert"
    className="mx-auto flex max-w-xl flex-wrap items-center justify-center gap-3 rounded-xl bg-surface-2 px-5 py-4 text-sm text-text-low dark:bg-dark-surface-2 dark:text-dark-text-low">
    {message}
    <button
      type="button"
      onClick={onRetry}
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-semibold text-accent-ink cursor-pointer transition-colors hover:bg-surface-1 focus-visible:outline-2 focus-visible:outline-accent dark:text-dark-accent dark:hover:bg-dark-surface-1 dark:focus-visible:outline-dark-accent">
      <RotateCw className="h-4 w-4" aria-hidden="true" />
      {isEs ? "Reintentar" : "Try again"}
    </button>
  </div>
);

const AdditionalMediaData: React.FC<AdditionalMediaDataInterface> = ({ extras, mediaType, title, isEs }) => {
  const [activeTab, setActiveTab] = useState<TabID>("images");
  const tabRefs = useRef<Record<TabID, HTMLButtonElement | null>>({ images: null, videos: null, reviews: null });
  const railRef = useRef<HTMLUListElement>(null);
  const baseId = useId();
  const similarHeadingId = `${baseId}-similar`;

  const { loading, similar, images, videos, reviews, retry } = extras;
  const similarItems = similar.data ?? [];

  const counts: Record<TabID, number | null> = {
    images: images.data ? (images.data.backdrops?.length ?? 0) + (images.data.posters?.length ?? 0) : null,
    videos: videos.data ? videos.data.filter((video) => video.site === "YouTube").length : null,
    reviews: reviews.data ? reviews.data.length : null,
  };

  // WAI-ARIA tabs: arrows move and activate, Home/End jump to the ends.
  const handleTabKey = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = TABS.length - 1;
    const next =
      event.key === "ArrowRight" ? (index === last ? 0 : index + 1)
      : event.key === "ArrowLeft" ? (index === 0 ? last : index - 1)
      : event.key === "Home" ? 0
      : event.key === "End" ? last
      : null;
    if (next === null) return;
    event.preventDefault();
    setActiveTab(TABS[next]);
    tabRefs.current[TABS[next]]?.focus();
  };

  const scrollRail = (direction: 1 | -1) => {
    const row = railRef.current;
    if (!row) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    row.scrollBy({ left: direction * row.clientWidth * 0.8, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
      {loading || similarItems.length > 0 ? (
        <section aria-labelledby={similarHeadingId} className="mx-auto max-w-6xl">
          <h2
            id={similarHeadingId}
            className="mb-3 text-xl font-bold tracking-tight text-text-high dark:text-dark-text-high md:text-2xl">
            {isEs ? "Títulos similares" : "More like this"}
          </h2>
          {loading ? (
            <div aria-hidden="true" className="flex gap-3 overflow-hidden py-3">
              {Array.from({ length: 8 }, (_, i) => (
                <ShimmerBox key={i} className="h-48 w-32 shrink-0 rounded-lg md:h-60 md:w-48 2xl:h-80 2xl:w-60" />
              ))}
            </div>
          ) : (
            <div className="relative">
              <RailArrow
                direction="prev"
                label={isEs ? "Desplazar a la izquierda" : "Scroll left"}
                onClick={() => scrollRail(-1)}
              />
              <ul
                ref={railRef}
                aria-label={isEs ? `Títulos similares a ${title}` : `Titles similar to ${title}`}
                className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-px-4 px-4 py-3 [scrollbar-width:none] sm:-mx-2 sm:scroll-px-2 sm:px-2 motion-safe:scroll-smooth [&::-webkit-scrollbar]:hidden [@media(hover:none)]:rail-fade">
                {similarItems.map((item) => (
                  <li key={item.id} className="shrink-0 snap-start">
                    <LazyMediaContainer media_={item} type={mediaType} containerType="Minimal" />
                  </li>
                ))}
              </ul>
              <RailArrow
                direction="next"
                label={isEs ? "Desplazar a la derecha" : "Scroll right"}
                onClick={() => scrollRail(1)}
              />
            </div>
          )}
        </section>
      ) : null}

      <section aria-label={isEs ? `Material de ${title}` : `${title} media`} className="mx-auto mt-12 max-w-6xl sm:mt-16">
        <div
          role="tablist"
          aria-label={isEs ? "Material adicional" : "Additional media"}
          className="mx-auto mb-8 grid w-full max-w-md grid-cols-3 rounded-full bg-surface-2 p-1 shadow-sm dark:bg-dark-surface-2 sm:mb-10">
          {TABS.map((tab, index) => {
            const selected = tab === activeTab;
            const count = counts[tab];
            return (
              <button
                key={tab}
                ref={(node) => {
                  tabRefs.current[tab] = node;
                }}
                type="button"
                role="tab"
                id={`${baseId}-tab-${tab}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel-${tab}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveTab(tab)}
                onKeyDown={(event) => handleTabKey(event, index)}
                className={`inline-flex h-10 items-center justify-center gap-1.5 rounded-full px-3 text-sm font-semibold cursor-pointer transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:focus-visible:outline-dark-accent ${
                  selected
                    ? "bg-surface-3 text-text-high shadow-sm dark:bg-dark-surface-3 dark:text-dark-text-high"
                    : "text-text-low hover:text-text-high dark:text-dark-text-low dark:hover:text-dark-text-high"
                }`}>
                {tabLabel(tab, isEs)}
                {!loading && count !== null && count > 0 ? (
                  <span className="text-xs font-medium tabular-nums text-text-low dark:text-dark-text-low">{count}</span>
                ) : null}
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`${baseId}-panel-${activeTab}`}
          aria-labelledby={`${baseId}-tab-${activeTab}`}
          aria-busy={loading}
          tabIndex={0}
          className="rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent dark:focus-visible:outline-dark-accent">
          {loading ? (
            <div aria-hidden="true" className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }, (_, i) => (
                <ShimmerBox key={i} className="aspect-video w-full rounded-lg" />
              ))}
            </div>
          ) : activeTab === "images" ? (
            images.failed ? (
              <SectionError
                message={isEs ? "No pudimos cargar las imágenes." : "We couldn't load the images."}
                onRetry={retry}
                isEs={isEs}
              />
            ) : (
              <CreateMediaImages images={images.data} title={title} isEs={isEs} />
            )
          ) : activeTab === "videos" ? (
            videos.failed ? (
              <SectionError
                message={isEs ? "No pudimos cargar los videos." : "We couldn't load the videos."}
                onRetry={retry}
                isEs={isEs}
              />
            ) : (
              <CreateMediaVideos mediaVideos={videos.data} isEs={isEs} />
            )
          ) : reviews.failed ? (
            <SectionError
              message={isEs ? "No pudimos cargar las reseñas." : "We couldn't load the reviews."}
              onRetry={retry}
              isEs={isEs}
            />
          ) : (
            <CreateMediaReviews mediaReviews={reviews.data} isEs={isEs} />
          )}
        </div>
      </section>
    </div>
  );
};

export { AdditionalMediaData };
