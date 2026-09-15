import React, { useMemo, memo } from "react";
import { useInView } from "react-intersection-observer";
import { MediaContainer } from "../media-container";
import { ShimmerBox } from "@/components/utilities/loading-skeletons/ShimmerBox";
import { SingleMediaSkeleton } from "@/components/utilities/loading-skeletons";
import { LazyMediaContainerProps } from "./types";

const LazyMediaContainer: React.FC<LazyMediaContainerProps> = memo(
  ({ media_, type, containerType }) => {
    const { ref, inView } = useInView({
      triggerOnce: true,
      rootMargin: "200px 0px",
    });

    const containerStyles = useMemo(() => {
      switch (containerType) {
        case "Normal":
        case "Similar":
          // Posters are 2:3; fixed heights cropped them into squat slivers on phones.
          return "w-full aspect-[2/3]";
        case "Minimal":
          return "flex-shrink-0 w-32 h-48 md:w-48 md:h-60 2xl:w-60 2xl:h-80";
        default:
          return "";
      }
    }, [containerType]);

    return (
      <div ref={ref} className={containerStyles}>
        {inView ? (
          <MediaContainer
            media_={media_}
            type={type}
            variant={containerType === "Minimal" ? "Minimal" : "Default"}
          />
        ) : containerType === "Minimal" ? (
          <ShimmerBox className="w-full h-full rounded-lg shadow-lg p-2" />
        ) : (
          <SingleMediaSkeleton />
        )}
      </div>
    );
  }
);

export { LazyMediaContainer };
