import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { RemovedEntry } from "@/context/favorite-media-context/types";

const VISIBLE_MS = 6000;

/**
 * "Removed X · Undo" bar. It stays while the pointer or focus is on it, so a
 * keyboard user who tabs to Undo never loses the chance.
 */
const UndoRemoval = ({
  entry,
  onUndo,
  onDismiss,
  isEs,
}: {
  entry: RemovedEntry;
  onUndo: () => void;
  onDismiss: () => void;
  isEs: boolean;
}) => {
  const [held, setHeld] = useState(false);
  const title = "title" in entry.item ? entry.item.title : entry.item.name;

  useEffect(() => {
    if (held) return;
    const timer = window.setTimeout(onDismiss, VISIBLE_MS);
    return () => window.clearTimeout(timer);
  }, [entry.seq, held, onDismiss]);

  return (
    <div
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setHeld(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") onDismiss();
      }}
      className="fixed inset-x-4 bottom-16 z-1050 mx-auto flex max-w-md items-center gap-3 rounded-xl bg-text-high py-2 pl-4 pr-2 text-sm text-surface-3 shadow-2xl motion-safe:animate-fade-in dark:bg-dark-surface-3 dark:text-dark-text-high lg:bottom-6">
      <p className="min-w-0 flex-1">
        <span className="line-clamp-2 break-words">
          {isEs ? "Quitado de guardados: " : "Removed from saved: "}
          <span className="font-semibold">{title}</span>
        </span>
      </p>
      <button
        type="button"
        onClick={onUndo}
        className="h-10 shrink-0 rounded-full px-4 font-semibold text-dark-accent cursor-pointer transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-accent">
        {isEs ? "Deshacer" : "Undo"}
      </button>
      <button
        type="button"
        onClick={onDismiss}
        aria-label={isEs ? "Cerrar aviso" : "Dismiss"}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full cursor-pointer transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-accent">
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
};

export { UndoRemoval };
