import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { LoaderCircle, RotateCw } from "lucide-react";
import { LazyMediaContainer } from "@/components/common/lazy-media-container";
import { ShimmerBox } from "@/components/utilities/loading-skeletons/ShimmerBox";
import { MediaTypeT } from "@/types/media-type";
import { BrowseItem } from "./use-browse-media";

const gridClasses =
  "grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6";

const BrowseGridSkeleton = () => (
  <ul aria-hidden="true" className={gridClasses}>
    {Array.from({ length: 12 }, (_, i) => (
      <li key={i}>
        <ShimmerBox className="aspect-[2/3] w-full rounded-lg shadow-lg" />
      </li>
    ))}
  </ul>
);

interface BrowseGridProps {
  items: BrowseItem[];
  type: MediaTypeT;
  refreshing: boolean;
  hasMore: boolean;
  more: "idle" | "loading" | "error";
  onLoadMore: () => void;
  isEs: boolean;
}

const BrowseGrid = ({
  items,
  type,
  refreshing,
  hasMore,
  more,
  onLoadMore,
  isEs,
}: BrowseGridProps) => {
  // Auto-load when the end comes into view; the button stays as the explicit path.
  const { ref: sentinelRef, inView } = useInView({ rootMargin: "600px 0px" });

  useEffect(() => {
    if (inView && hasMore && more === "idle" && !refreshing) onLoadMore();
  }, [inView, hasMore, more, refreshing, onLoadMore]);

  return (
    <>
      <ul
        className={`${gridClasses} transition-opacity duration-200 ${
          refreshing ? "pointer-events-none opacity-50" : ""
        }`}>
        {items.map((item) => (
          <li key={item.id}>
            <LazyMediaContainer media_={item} type={type} containerType="Normal" />
          </li>
        ))}
      </ul>

      {!refreshing ? (
        <div ref={sentinelRef} className="mt-10 flex flex-col items-center gap-3 text-sm">
          {more === "error" ? (
            <div role="alert" className="flex flex-col items-center gap-3 text-center">
              <p className="text-text-low dark:text-dark-text-low">
                {isEs
                  ? "No pudimos cargar más títulos. Lo que ya ves sigue aquí."
                  : "We couldn't load more titles. Everything above is still here."}
              </p>
              <button
                type="button"
                onClick={onLoadMore}
                className="inline-flex items-center gap-2 rounded-full bg-accent-ink px-5 py-2.5 font-semibold text-white cursor-pointer transition-colors duration-200 hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:bg-dark-accent dark:text-dark-bg-main dark:hover:bg-dark-primary dark:focus-visible:outline-dark-accent">
                <RotateCw className="h-4 w-4" aria-hidden="true" />
                {isEs ? "Reintentar" : "Try again"}
              </button>
            </div>
          ) : hasMore ? (
            <button
              type="button"
              onClick={onLoadMore}
              disabled={more === "loading"}
              className="inline-flex min-w-40 items-center justify-center gap-2 rounded-full bg-surface-1 px-5 py-2.5 font-semibold text-text-high shadow-sm cursor-pointer transition-colors duration-200 hover:bg-surface-3 disabled:cursor-wait focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:bg-dark-surface-1 dark:text-dark-text-high dark:hover:bg-dark-surface-3 dark:focus-visible:outline-dark-accent">
              {more === "loading" ? (
                <>
                  <LoaderCircle className="h-4 w-4 motion-safe:animate-spin" aria-hidden="true" />
                  {isEs ? "Cargando…" : "Loading…"}
                </>
              ) : isEs ? (
                "Cargar más"
              ) : (
                "Load more"
              )}
            </button>
          ) : items.length > 0 ? (
            <p className="text-text-low dark:text-dark-text-low">
              {isEs ? "Llegaste al final de la lista." : "You've reached the end of the list."}
            </p>
          ) : null}
        </div>
      ) : null}
    </>
  );
};

export { BrowseGrid, BrowseGridSkeleton };
