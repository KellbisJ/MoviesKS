import { ChevronDown } from "lucide-react";

/**
 * Labelled native select in a pill. Phones: fills its grid cell and hides the
 * visible label (values name themselves). sm+: sizes to content with the muted label shown.
 */
const SelectPill = ({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}) => (
  <label className="relative flex h-11 w-full min-w-0 items-center gap-2 rounded-full bg-surface-1 pl-4 pr-9 text-sm shadow-sm transition-shadow focus-within:ring-2 focus-within:ring-accent dark:bg-dark-surface-1 dark:focus-within:ring-dark-accent sm:h-10 sm:w-auto">
    <span className="max-sm:sr-only shrink-0 text-text-low dark:text-dark-text-low">{label}</span>
    {/* Native select: the OS picker is the best thumb-reach control on phones.
        A select is as wide as its longest option, so it must be allowed to shrink (min-w-0 + truncate). */}
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-full min-w-0 flex-1 cursor-pointer appearance-none truncate bg-transparent font-semibold text-text-high outline-none dark:text-dark-text-high sm:flex-none [&>option]:bg-surface-3 [&>option]:text-text-high dark:[&>option]:bg-dark-surface-2 dark:[&>option]:text-dark-text-high">
      {children}
    </select>
    <ChevronDown
      aria-hidden="true"
      className="pointer-events-none absolute right-3 h-4 w-4 text-text-low dark:text-dark-text-low"
    />
  </label>
);

export { SelectPill };
