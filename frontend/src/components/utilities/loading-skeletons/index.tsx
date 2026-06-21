import { useNavigate } from "react-router-dom";
import { MovieInterface, TVInterface } from "@/types/movie-and-tv-interface";
import { MediaNullSkeletonPropsInterface } from "./types";
import {
  MovieDetailInterface,
  TVDetailInterface,
} from "@/services/media-detail/types";

const MediaSkeleton = () => {
  const count = 20;
  return (
    <div className="max-w-[1536px] mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-3">
        {Array.from({ length: count }, (_, index) => (
          <div
            key={index}
            className="w-full h-36 md:h-80 xl:h-[400px] aspect-2/3 bg-surface-2 dark:bg-dark-surface-2 animate-pulse rounded-lg shadow-lg cursor-pointer p-2"></div>
        ))}
      </div>
    </div>
  );
};

const MediaNullSkeleton: React.FC<MediaNullSkeletonPropsInterface> = ({
  data,
  type,
  title,
}) => {
  const navigate = useNavigate();
  const handleNavigation = (
    data:
      | MovieInterface
      | TVInterface
      | MovieDetailInterface
      | TVDetailInterface
  ) => {
    const idParam = data.id;
    navigate(`/${type}/detail/${idParam}`);
  };
  return (
    <div
      className="w-full h-[280px] md:h-80 xl:h-[400px] aspect-2/3 bg-surface-2 dark:bg-dark-surface-2 rounded-lg shadow-lg cursor-pointer flex justify-center items-center p-4 text-center text-text-high dark:text-dark-text-high text-sm"
      onClick={() => handleNavigation(data)}>
      No image available for: {title}
    </div>
  );
};

const CategoriesSkeleton = () => {
  const count = 16;
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className="flex justify-center items-center w-full bg-surface-2 dark:bg-dark-surface-2 animate-pulse shadow-md cursor-pointer p-1 rounded-md min-w-[40px] min-h-[38px] max-w-full"></div>
      ))}
    </>
  );
};

const BigPosterPathNullSkeleton = () => {
  return (
    <div className="w-full h-full aspect-2/3 bg-surface-2 dark:bg-dark-surface-2 rounded-lg flex justify-center items-center">
      No image available
    </div>
  );
};

const SimilarGenresNullSkeleton = () => {
  return (
    <div className="flex justify-center items-center bg-surface-2 dark:bg-dark-surface-2 rounded-md p-1 m-1 min-w-[40px] min-h-[38px] max-w-full text-center text-text-low dark:text-dark-text-low text-sm">
      No similar genres available
    </div>
  );
};

const MediaSavedVoid = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5 lg:gap-8 w-full">
      <div className="col-span-full w-full bg-surface-2 dark:bg-dark-surface-2 border-2 border-dashed border-secondary dark:border-dark-secondary rounded-lg h-80 flex items-center justify-center text-text-low dark:text-dark-text-low italic">
        No Favorites Yet
      </div>
    </div>
  );
};

const MediaHomeSkeleton = () => {
  const count = 20;

  return (
    <div className="w-full overflow-x-auto scrollbar-minimal wrap-break-word bg-bg-main dark:bg-dark-bg-main">
      <div className="flex space-x-4 p-3">
        {Array.from({ length: count }, (_, index) => (
          <div
            key={index}
            className="shrink-0 w-32 h-48 md:w-48 md:h-60 2xl:w-60 2xl:h-80 bg-surface-2 dark:bg-dark-surface-2 rounded-lg shadow-lg cursor-pointer p-2 animate-pulse"></div>
        ))}
      </div>
    </div>
  );
};

const MediaHomeErrorSkeleton = () => {
  const count = 20;

  return (
    <div className="w-full overflow-x-auto scrollbar-minimal wrap-break-word bg-bg-main dark:bg-dark-bg-main">
      <div className="flex space-x-4 p-3">
        {Array.from({ length: count }, (_, index) => (
          <div
            key={index}
            className="shrink-0 w-32 h-48 md:w-48 md:h-60 2xl:w-60 2xl:h-80 bg-surface-2 dark:bg-dark-surface-2 rounded-lg shadow-lg cursor-pointer p-2">
            Error loading this, check internet connection or reload the page.
          </div>
        ))}
      </div>
    </div>
  );
};

const MediaNullSkeletonHome: React.FC<MediaNullSkeletonPropsInterface> = ({
  data,
  type,
  title,
}) => {
  const navigate = useNavigate();
  const handleNavigation = (
    data:
      | MovieInterface
      | TVInterface
      | MovieDetailInterface
      | TVDetailInterface
  ) => {
    const idParam = data.id;
    navigate(`/${type}/detail/${idParam}`);
  };
  return (
    <div
      className="w-32 h-48 md:w-48 md:h-60 2xl:w-60 2xl:h-80 bg-surface-2 dark:bg-dark-surface-2 rounded-lg shadow-lg cursor-pointer flex justify-center items-center p-4 text-center text-text-high dark:text-dark-text-high text-sm"
      onClick={() => handleNavigation(data)}>
      No image available for: {title}
    </div>
  );
};

const SingleMediaSkeleton = () => (
  <div className="w-full h-36 md:h-80 xl:h-[400px] aspect-2/3 bg-surface-2 dark:bg-dark-surface-2 animate-pulse rounded-lg shadow-lg cursor-pointer p-2"></div>
);

export {
  MediaSkeleton,
  MediaNullSkeleton,
  CategoriesSkeleton,
  BigPosterPathNullSkeleton,
  SimilarGenresNullSkeleton,
  MediaSavedVoid,
  MediaHomeSkeleton,
  MediaHomeErrorSkeleton,
  SingleMediaSkeleton,
  MediaNullSkeletonHome,
};
