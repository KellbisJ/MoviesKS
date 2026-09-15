import { ChevronLeft, ChevronRight } from "lucide-react";

/** Scroll button for horizontal poster rails; only shown on hover-capable screens from md up. */
const RailArrow = ({
  direction,
  label,
  onClick,
}: {
  direction: "prev" | "next";
  label: string;
  onClick: () => void;
}) => (
  <button
    type="button"
    aria-label={label}
    onClick={onClick}
    className={`absolute top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-surface-3 text-text-high shadow-[0_6px_18px_-6px_rgba(0,0,0,0.45)] cursor-pointer transition-[transform,background-color,color] duration-200 ease-out hover:bg-accent-ink hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-95 dark:bg-dark-surface-3 dark:text-dark-text-high dark:shadow-[0_6px_18px_-6px_rgba(0,0,0,0.7)] dark:hover:bg-dark-accent dark:hover:text-dark-bg-main dark:focus-visible:outline-dark-accent [@media(min-width:768px)_and_(hover:hover)]:flex ${
      direction === "prev" ? "-left-3" : "-right-3"
    }`}>
    {direction === "prev" ? (
      <ChevronLeft className="h-5 w-5" aria-hidden="true" />
    ) : (
      <ChevronRight className="h-5 w-5" aria-hidden="true" />
    )}
  </button>
);

export { RailArrow };
