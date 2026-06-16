import { apiClient, API_SEARCH_MEDIA } from "../index";
import { MediaBySearchInterface } from "./types";
import { MediaTypeT } from "@/types/media-type";

async function getMediaBySearch(
  type: `${MediaTypeT}`,
  query: string,
  page = 1
): Promise<MediaBySearchInterface> {
  try {
    // console.log('Fetching API URL:', apiUrl);
    const media = await apiClient<MediaBySearchInterface>(
      API_SEARCH_MEDIA(type),
      {
        params: {
          query: query,
          page: page,
        },
      }
    );
    return media;
  } catch (error) {
    // console.error('Error fetching media:', error);
    return {
      page: 1,
      results: [],
      total_pages: 0,
      total_results: 0,
    };
  }
}
export { getMediaBySearch };
