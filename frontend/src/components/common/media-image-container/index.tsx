import React from "react";
import { Expand } from "lucide-react";
import { MediaImageT } from "@/components/specific/create-media-images";
import { mediaImageSrc } from "@/utils/media-image-src";

/**
 * One gallery tile. The whole tile is the button that opens the viewer, so it
 * works with a single tap, a click, or Enter/Space.
 */
const MediaImageContainer = ({
  mediaImg,
  label,
  onOpen,
}: {
  mediaImg: MediaImageT;
  /** Accessible name, e.g. "Backdrop 3 of 24". */
  label: string;
  onOpen: () => void;
}): React.JSX.Element => (
  <button
    type="button"
    onClick={onOpen}
    aria-label={label}
    aria-haspopup="dialog"
    className="group relative block h-full w-full overflow-hidden rounded-lg bg-surface-2 shadow-lg cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:bg-dark-surface-2 dark:focus-visible:outline-dark-accent">
    <img
      className="h-full w-full object-cover opacity-0 transition-[opacity,transform] duration-500 motion-safe:group-hover:scale-[1.03]"
      src={mediaImageSrc(mediaImg.file_path, mediaImg.type === "backdrop" ? "w780" : "w342")}
      alt=""
      loading="lazy"
      onLoad={(e) => (e.currentTarget.style.opacity = "1")}
    />
    <span
      aria-hidden="true"
      className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100">
      <Expand className="h-4 w-4" />
    </span>
  </button>
);

export { MediaImageContainer };
