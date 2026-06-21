import { MediaTypeT } from "@/types/media-type";
import { MovieInterface, TVInterface } from "@/types/movie-and-tv-interface";
import { MediaImagesInterface } from "@/services/media-images/types";
import { MediaVideosResultInterface } from "@/services/media-videos/types";
import { MediaReviewInterface } from "@/services/reviews/types";

interface AdditionalMediaDataInterface {
  loadingAdditionalMediaData: boolean;
  similarMedia: MovieInterface[] | TVInterface[];
  mediaType: MediaTypeT;
  mediaImages: MediaImagesInterface;
  mediaVideos: MediaVideosResultInterface[];
  mediaReviews: MediaReviewInterface;
}

export { AdditionalMediaDataInterface };
