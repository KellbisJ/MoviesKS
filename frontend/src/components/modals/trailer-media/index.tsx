import React from "react";
import { X } from "lucide-react";
import { Dialog } from "@/components/common/dialog";
import { TrailerMediaModalPropsInterface } from "./types";

const TrailerMedia: React.FC<TrailerMediaModalPropsInterface> = ({
  isOpen,
  onClose,
  videoKey,
  title,
  isEs,
}) => {
  if (!videoKey) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      label={isEs ? `Tráiler: ${title}` : `Trailer: ${title}`}
      // Width is capped by the viewport height too, so the close button stays on screen in landscape.
      className="flex w-[min(100%,960px,calc((100dvh-6rem)*16/9))] flex-col items-end gap-3">
      <button
        type="button"
        onClick={onClose}
        data-autofocus
        className="inline-flex h-10 items-center gap-2 rounded-full bg-white/15 px-4 text-sm font-semibold text-white cursor-pointer transition-colors duration-200 hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-accent">
        <X className="h-4 w-4" aria-hidden="true" />
        {isEs ? "Cerrar" : "Close"}
      </button>
      <div className="aspect-video w-full overflow-hidden rounded-xl bg-black shadow-2xl">
        <iframe
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full border-0"
        />
      </div>
    </Dialog>
  );
};

export { TrailerMedia };
