import { ShimmerBox } from "@/components/utilities/loading-skeletons/ShimmerBox";

/** Loading shape that mirrors the real page: lead feature, search, ranked rows, rail. */
const HomeSkeleton = ({ isEs }: { isEs: boolean }) => (
  <div aria-busy="true">
    <span className="sr-only" role="status">
      {isEs ? "Cargando cartelera…" : "Loading titles…"}
    </span>
    <div aria-hidden="true">
      <ShimmerBox className="aspect-[4/5] w-full rounded-[20px] sm:aspect-video lg:aspect-auto lg:h-[min(62vh,600px)]" />
      <ShimmerBox className="relative mx-auto -mt-7 h-14 max-w-3xl rounded-full shadow-lg sm:-mt-8" />
      {[0, 1].map((section) => (
        <div
          key={section}
          className="mt-10 grid gap-4 rounded-[20px] bg-surface-1 p-4 dark:bg-dark-surface-1 sm:mt-14 sm:p-5 md:p-6">
          <ShimmerBox className="h-6 w-48 rounded-full" />
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 xl:grid-cols-4">
            {[0, 1, 2, 3].map((row) => (
              <ShimmerBox key={row} className="h-20 rounded-xl" />
            ))}
          </div>
          <div className="flex gap-3 overflow-hidden py-3">
            {[0, 1, 2, 3, 4, 5, 6].map((card) => (
              <ShimmerBox
                key={card}
                className="h-48 w-32 shrink-0 rounded-lg md:h-60 md:w-48 2xl:h-80 2xl:w-60"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export { HomeSkeleton };
