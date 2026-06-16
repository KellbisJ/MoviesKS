import React, { useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { MediaContainer } from "../media-container";
import {
  MediaHomeSkeleton,
  SingleMediaSkeleton,
} from "@/components/utilities/loading-skeletons";
import { LazyMediaContainerProps } from "./types";
import { MediaImageContainer } from "../media-image-container";

const LazyMediaContainer: React.FC<LazyMediaContainerProps> = ({
  media_,
  type,
  containerType,
  colSpan,
  imgUrl,
  mediaImg,
  allImages,
  mediaImageId,
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "200px 0px",
  });

  const containerStyles = useMemo(() => {
    const base = "transition-opacity duration-300 w-full h-full";
    switch (containerType) {
      case "Normal":
      case "Similar":
        return `${base} h-36 sm:h-60 md:h-80 xl:h-[400px]`;
      case "Minimal":
        return "flex-shrink-0 w-32 h-48 md:w-48 md:h-60 2xl:w-60 2xl:h-80";
      case "Images":
        return "relative overflow-hidden rounded-lg shadow-lg group w-full h-full";
      default:
        return "";
    }
  }, [containerType]);

  const dynamicStyles = useMemo(
    () => ({
      gridColumn: colSpan ? `span ${colSpan}` : undefined,
      aspectRatio: mediaImg?.aspect_ratio ?? "auto",
    }),
    [colSpan, mediaImg?.aspect_ratio]
  );

  return (
    <div ref={ref} className={containerStyles} style={dynamicStyles}>
      {inView ? (
        containerType === "Images" ? (
          mediaImg ? (
            <MediaImageContainer
              mediaImg={mediaImg}
              colSpan={colSpan!}
              imgUrl={imgUrl!}
              allImages={allImages!}
              mediaImageId={mediaImageId!}
            />
          ) : (
            <div className="text-red-500">No images</div>
          )
        ) : (
          <MediaContainer
            media_={media_!}
            type={type!}
            variant={containerType === "Minimal" ? "Minimal" : "Default"}
          />
        )
      ) : containerType === "Normal" ||
        containerType === "Similar" ||
        containerType === "Images" ? (
        <SingleMediaSkeleton />
      ) : (
        <MediaHomeSkeleton />
      )}
    </div>
  );
};

export { LazyMediaContainer };
