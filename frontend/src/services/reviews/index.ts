import { apiClient, API_MEDIA_REVIEWS } from "..";
import { MediaTypeT } from "@/types/media-type";
import { MediaReviewInterface } from "./types";
import { LanguageISOCode } from "@/types/languages";

async function getMediaReviews(
  type: `${MediaTypeT}`,
  id: string,
  lang: LanguageISOCode
): Promise<MediaReviewInterface> {
  try {
    async function getDataMediaReviews(
      lang: LanguageISOCode
    ): Promise<MediaReviewInterface> {
      const reviews: MediaReviewInterface =
        await apiClient<MediaReviewInterface>(API_MEDIA_REVIEWS(type, id), {
          params: {
            language: lang,
          },
        });
      return reviews;
    }

    const reviewsData = getDataMediaReviews(lang);

    if ((await reviewsData).results.length === 0) {
      return getDataMediaReviews((lang = "en-US"));
    } // Superficial Fallback

    return reviewsData;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { getMediaReviews };
