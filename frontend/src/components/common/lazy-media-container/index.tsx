import React, { useEffect, useState, useMemo, useRef } from "react";
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
  const pxIntersection =
    containerType === "Normal" || containerType === "Images"
      ? "0px 0px"
      : "200px 0px";

  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: pxIntersection,
  });

  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const hasLoaded = useRef<boolean>(false);

  useEffect(() => {
    if (inView && !hasLoaded.current) {
      const timer = setTimeout(() => {
        hasLoaded.current = true;
        setIsLoaded(true);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  const containerStyles = useMemo(() => {
    switch (containerType) {
      case "Normal":
      case "Similar":
        return "w-full h-36 sm:h-60 md:h-80 xl:h-[400px] transition-opacity duration-500";
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
      ...(colSpan !== undefined && { gridColumn: `span ${colSpan}` }),
      ...(mediaImg?.aspect_ratio && { aspectRatio: mediaImg.aspect_ratio }),
    }),
    [colSpan, mediaImg?.aspect_ratio]
  );

  const variantForMediaContainer =
    containerType === "Minimal" ? "Minimal" : "Default";

  const renderContent = () => {
    if (
      containerType === "Normal" ||
      containerType === "Similar" ||
      containerType === "Minimal"
    ) {
      if (media_ && type) {
        return (
          <MediaContainer
            media_={media_}
            type={type}
            variant={variantForMediaContainer}
          />
        );
      }
      return <div className="text-red-500">Missing media or type</div>;
    }

    if (containerType === "Images") {
      if (mediaImg && colSpan && imgUrl && allImages && mediaImageId) {
        return (
          <MediaImageContainer
            mediaImg={mediaImg}
            colSpan={colSpan}
            imgUrl={imgUrl}
            allImages={allImages}
            mediaImageId={mediaImageId}
          />
        );
      }
      return <div className="text-red-500">No images available</div>;
    }

    return <div className="text-red-500">Unhandled container type</div>;
  };

  const renderSkeleton = () => {
    if (
      containerType === "Normal" ||
      containerType === "Similar" ||
      containerType === "Images"
    ) {
      return <SingleMediaSkeleton />;
    }
    return <MediaHomeSkeleton />;
  };

  return (
    <div ref={ref} className={containerStyles} style={dynamicStyles}>
      {!isLoaded ? renderSkeleton() : renderContent()}
    </div>
  );
};

export { LazyMediaContainer };
