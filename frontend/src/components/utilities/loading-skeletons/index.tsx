import { Link } from "react-router-dom";
import { Film } from "lucide-react";
import { MediaNullSkeletonPropsInterface } from "./types";
import { useLanguages } from "@/context/lang";
import { isSpanishLang } from "@/utils/is-spanish-lang";
import { ShimmerBox } from "./ShimmerBox";

/**
 * Poster-less media: still a real link to the detail page, labelled with the
 * title, so keyboard and screen-reader users reach it like any other card.
 */
const MediaNullPoster = ({
  data,
  type,
  title,
  className,
}: MediaNullSkeletonPropsInterface & { className: string }) => {
  const { language } = useLanguages();
  return (
    <Link
      to={`/${type}/detail/${data.id}`}
      className={`flex flex-col items-center justify-center gap-2 rounded-lg bg-surface-2 p-4 text-center shadow-lg transition-shadow duration-300 hover:shadow-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:bg-dark-surface-2 dark:focus-visible:outline-dark-accent ${className}`}>
      <Film
        className="h-7 w-7 text-secondary dark:text-dark-secondary"
        aria-hidden="true"
      />
      <span className="line-clamp-3 text-sm font-semibold text-text-high dark:text-dark-text-high">
        {title}
      </span>
      <span className="text-xs text-text-low dark:text-dark-text-low">
        {isSpanishLang(language) ? "Sin póster" : "No poster"}
      </span>
    </Link>
  );
};

const MediaNullSkeleton: React.FC<MediaNullSkeletonPropsInterface> = (props) => (
  <MediaNullPoster
    {...props}
    className="w-full h-[280px] md:h-80 xl:h-[400px] aspect-2/3"
  />
);

const CategoriesSkeleton = () => {
  const count = 16;
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <ShimmerBox
          key={index}
          className="shadow-md p-1 rounded-md min-w-[40px] min-h-[38px] max-w-full"
        />
      ))}
    </>
  );
};

const BigPosterPathNullSkeleton = () => {
  const { language } = useLanguages();
  return (
    <div className="w-full h-full aspect-2/3 bg-surface-2 dark:bg-dark-surface-2 rounded-lg flex flex-col gap-2 justify-center items-center text-sm text-text-low dark:text-dark-text-low">
      <Film className="h-10 w-10 text-secondary dark:text-dark-secondary" aria-hidden="true" />
      {isSpanishLang(language) ? "Sin póster" : "No poster"}
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

const MediaNullSkeletonHome: React.FC<MediaNullSkeletonPropsInterface> = (
  props
) => <MediaNullPoster {...props} className="h-full w-full" />;

const SingleMediaSkeleton = () => (
  <ShimmerBox className="w-full h-full rounded-lg shadow-lg" />
);

export {
  MediaNullSkeleton,
  CategoriesSkeleton,
  BigPosterPathNullSkeleton,
  SimilarGenresNullSkeleton,
  MediaSavedVoid,
  SingleMediaSkeleton,
  MediaNullSkeletonHome,
};