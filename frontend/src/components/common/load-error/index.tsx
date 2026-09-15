import { RotateCw, TriangleAlert } from "lucide-react";

const primaryButton =
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-accent-ink px-5 py-2.5 text-sm font-semibold text-white cursor-pointer transition-colors duration-200 hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:bg-dark-accent dark:text-dark-bg-main dark:hover:bg-dark-primary dark:focus-visible:outline-dark-accent";

/** Page-level "the request failed" alert with a retry pill. */
const LoadError = ({
  message,
  onRetry,
  isEs,
}: {
  message: string;
  onRetry: () => void;
  isEs: boolean;
}) => (
  <div
    role="alert"
    className="mx-auto flex max-w-3xl flex-col gap-4 rounded-xl bg-surface-1 px-5 py-4 text-sm text-text-high shadow-sm dark:bg-dark-surface-1 dark:text-dark-text-high sm:flex-row sm:items-center">
    <TriangleAlert className="h-5 w-5 shrink-0 text-accent-ink dark:text-dark-accent" aria-hidden="true" />
    <p className="flex-1 text-text-low dark:text-dark-text-low">{message}</p>
    <button type="button" onClick={onRetry} className={`${primaryButton} self-start sm:self-auto`}>
      <RotateCw className="h-4 w-4" aria-hidden="true" />
      {isEs ? "Reintentar" : "Try again"}
    </button>
  </div>
);

export { LoadError, primaryButton };
