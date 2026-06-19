import React, { useMemo, useCallback, memo } from "react";
import { CreateMediaPropsInterface } from "./types";
import { MovieInterface, TVInterface } from "@/types/movie-and-tv-interface";
import {
  MovieDetailInterface,
  TVDetailInterface,
} from "@/services/media-detail/types";
import { LazyMediaContainer } from "../../common/lazy-media-container";

const isMovieOrTV = (
  media: MovieInterface | TVInterface | MovieDetailInterface | TVDetailInterface
): media is
  | MovieInterface
  | TVInterface
  | MovieDetailInterface
  | TVDetailInterface => {
  return (
    (media as MovieInterface | MovieDetailInterface).title !== undefined ||
    (media as TVInterface | TVDetailInterface).name !== undefined
  );
};

const CreateMedia: React.FC<CreateMediaPropsInterface> = memo(
  ({ media, type, section = "Default" }) => {
    const filteredMedia = useMemo(() => {
      if (!Array.isArray(media)) return [];
      return media.filter(isMovieOrTV);
    }, [media]);

    const handleMediaRender = useCallback(
      (mediaItem: (typeof filteredMedia)[number]) => (
        <LazyMediaContainer
          key={mediaItem.id}
          media_={mediaItem}
          type={type}
          containerType={section === "Default" ? "Normal" : "Minimal"}
        />
      ),
      [type, section]
    );

    if (!section) return <p>No section specified on CreateMedia</p>;

    return (
      <>
        {section === "Default" ? (
          <div className="max-w-[1536px] mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredMedia.map(handleMediaRender)}
            </div>
          </div>
        ) : (
          <div className="w-full overflow-x-auto overflow-y-hidden scrollbar-minimal bg-surface-1 dark:bg-dark-surface-1 rounded-lg translate-z-0 overscroll-x-contain">
            <div className="flex space-x-4 p-3">
              {filteredMedia.map(handleMediaRender)}
            </div>
          </div>
        )}
      </>
    );
  }
);

export { CreateMedia };
