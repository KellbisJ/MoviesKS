import { ShimmerBox } from "./ShimmerBox";

/**
 * One generic loading panel: a few neutral shimmer blocks inside a
 * container. No fake data, no blur — just an empty shape while a
 * section waits on its first fetch.
 */
const SimpleSkeleton = () => (
  <div
    aria-hidden="true"
    className="grid gap-4 rounded-2xl bg-surface-1 dark:bg-dark-surface-1 p-4 sm:p-6">
    <ShimmerBox className="h-5 w-1/3 rounded-full" />
    <ShimmerBox className="aspect-video w-full rounded-xl" />
    <div className="grid gap-3">
      <ShimmerBox className="h-5 w-[85%] rounded-full" />
      <ShimmerBox className="h-5 w-2/3 rounded-full" />
    </div>
  </div>
);

export { SimpleSkeleton };