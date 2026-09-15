import { TriangleAlert, X } from "lucide-react";
import { useSavedMedia } from "@/context/favorite-media-context";
import { useLanguages } from "@/context/lang";
import { isSpanishLang } from "@/utils/is-spanish-lang";

/** Shown on any page when the browser refuses to store a save (quota, blocked storage). */
const SaveStorageAlert = () => {
  const { storageFailed, dismissStorageError } = useSavedMedia();
  const isEs = isSpanishLang(useLanguages().language);

  if (!storageFailed) return null;

  return (
    <div
      role="alert"
      className="fixed inset-x-4 bottom-16 z-1050 mx-auto flex max-w-md items-start gap-3 rounded-xl bg-surface-3 py-3 pl-4 pr-2 text-sm text-text-high shadow-2xl motion-safe:animate-fade-in dark:bg-dark-surface-3 dark:text-dark-text-high lg:bottom-6">
      <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-accent-ink dark:text-dark-accent" aria-hidden="true" />
      <p className="flex-1">
        {isEs
          ? "Este navegador no dejó guardar el cambio (sin espacio o almacenamiento bloqueado). Se mantiene solo mientras la pestaña siga abierta."
          : "This browser didn't let us store the change (out of space or storage blocked). It only lasts while this tab stays open."}
      </p>
      <button
        type="button"
        onClick={dismissStorageError}
        aria-label={isEs ? "Cerrar aviso" : "Dismiss"}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full cursor-pointer transition-colors hover:bg-surface-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:hover:bg-dark-surface-1 dark:focus-visible:outline-dark-accent">
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
};

export { SaveStorageAlert };
