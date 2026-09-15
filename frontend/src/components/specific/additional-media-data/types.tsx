import { MediaTypeT } from "@/types/media-type";
import { MediaExtras } from "../media-detail-render/use-media-extras";

interface AdditionalMediaDataInterface {
  extras: MediaExtras;
  mediaType: MediaTypeT;
  /** The detail page's title, for rail and region labels. */
  title: string;
  isEs: boolean;
}

export { AdditionalMediaDataInterface };
