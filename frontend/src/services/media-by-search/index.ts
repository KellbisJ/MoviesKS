import { apiClient, API_SEARCH_MEDIA } from "../index";
import { MediaBySearchInterface } from "./types";
import { MediaTypeT } from "@/types/media-type";

/** TMDB refuses pages above 500, whatever total_pages says. */
const TMDB_MAX_PAGE = 500;

/**
 * One page of title search. Throws on failure, so callers can tell
 * "nothing matched" apart from "the request failed".
 */
async function getMediaBySearch(
  type: `${MediaTypeT}`,
  query: string,
  page = 1
): Promise<MediaBySearchInterface> {
  const data = await apiClient<MediaBySearchInterface>(API_SEARCH_MEDIA(type), {
    params: { query, page },
  });

  return {
    ...data,
    results: Array.isArray(data.results) ? data.results : [],
    total_pages: Math.min(data.total_pages ?? 0, TMDB_MAX_PAGE),
    total_results: data.total_results ?? 0,
  };
}

export { getMediaBySearch };
