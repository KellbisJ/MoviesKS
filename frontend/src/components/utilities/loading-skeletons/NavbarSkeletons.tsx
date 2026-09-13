import { useLocation, useParams } from "react-router-dom";
import { ShimmerBox } from "./ShimmerBox";

const NavbarSkeletonHero = () => (
  <div className="hidden lg:flex items-center justify-between container mx-auto px-4 sm:px-6 py-3 bg-bg-main dark:bg-dark-bg-main w-full transition h-14">
    <ShimmerBox className="hidden sm:block sm:w-20 py-4 rounded-lg" />
    <ShimmerBox className="w-60 sm:w-96 py-4 rounded-lg" />
    <ShimmerBox className="w-8 py-4 rounded-lg" />
  </div>
);

const NavbarSkeletonForwards = () => {
  const location = useLocation();
  const { type, id } = useParams();

  const showFilterbarPaths: string[] = [
    "/movie",
    "/tv",
    `/${type}/preview/genre/${id}`,
  ];
  const showFilterBar = showFilterbarPaths.includes(location.pathname);

  return (
    <>
      <div className="hidden lg:flex items-center h-14 md:h-16 px-4 sm:px-6 py-4 justify-between bg-surface-1 dark:bg-dark-surface-1 w-full fixed transition z-1000">
        <ShimmerBox className="w-12 md:w-20 xl:w-32 py-4 rounded-lg" />
        <ShimmerBox className="w-12 md:w-96 xl:w-[600px] 2xl:w-[900px] py-4 rounded-lg" />
        <ShimmerBox className="w-12 md:w-40 xl:w-80 py-4 rounded-lg" />
        <ShimmerBox className="hidden md:block w-8 2xl:w-12 py-4 rounded-lg" />
      </div>
      {showFilterBar && (
        <div className="flex flex-col items-center md:items-start p-6 lg:p-8 lg:mt-16 bg-surface-2 dark:bg-dark-surface-2 w-full gap-4 text-text-high dark:text-dark-text-high transition min-h-44">
          <ShimmerBox className="w-full md:w-2/5 sm:w-lg p-2.5 px-5 rounded min-h-44" />
          <ShimmerBox className="w-full md:w-2/5 sm:w-lg p-2.5 px-5 rounded min-h-44" />
        </div>
      )}
    </>
  );
};

export { NavbarSkeletonHero, NavbarSkeletonForwards };
