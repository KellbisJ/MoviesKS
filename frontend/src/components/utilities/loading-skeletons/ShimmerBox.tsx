/**
 * Glow-less shimmer placeholder for chrome/nav/lazy boxes.
 * Neutral surface tone only — the accent stays a spotlight.
 * Pass sizing/rounding utilities via className.
 */
const ShimmerBox = ({ className = "" }: { className?: string }) => (
  <div
    aria-hidden="true"
    className={`relative overflow-hidden bg-surface-2 dark:bg-dark-surface-2 ${className}`}>
    <div
      aria-hidden="true"
      className="absolute inset-y-0 -left-1/2 w-[200%] animate-skeleton-sweep will-change-transform bg-gradient-to-r from-transparent via-dark-surface-3/40 to-transparent dark:via-dark-surface-3/30"
    />
  </div>
);

export { ShimmerBox };