import {
  apiClient,
  API_MOVIE_CATEGORY,
  API_TV_CATEGORY,
  API_TRENDING_MOVIES_URL,
  API_TRENDING_TV_URL,
} from "../index";
import { MediaTypeT } from "@/types/media-type";
import { BrowseMediaPage, BrowseRequest } from "./types";

/** TMDB refuses pages above 500, whatever total_pages says. */
const TMDB_MAX_PAGE = 500;

const today = () => new Date().toISOString().slice(0, 10);

/**
 * One page of the browse grid. Unlike the older list services this throws on
 * failure, so the page can tell "no titles match" apart from "the request failed".
 */
async function getBrowseMedia({
  type,
  genres,
  sort,
  year,
  page,
}: BrowseRequest): Promise<BrowseMediaPage> {
  const isMovie = type === MediaTypeT.movie;
  let data: BrowseMediaPage;

  // Trending has no filters on TMDB; the page only offers it with none selected.
  if (sort === "trending" && genres.length === 0 && year === null) {
    data = await apiClient<BrowseMediaPage>(
      isMovie ? API_TRENDING_MOVIES_URL : API_TRENDING_TV_URL,
      { params: { page } }
    );
  } else {
    const dateField = isMovie ? "primary_release_date" : "first_air_date";
    const params: Record<string, string | number> = { page };

    if (genres.length > 0) params.with_genres = genres.join(",");
    if (year !== null) {
      params[isMovie ? "primary_release_year" : "first_air_date_year"] = year;
    }

    switch (sort) {
      case "top_rated":
        params.sort_by = "vote_average.desc";
        // Without a vote floor, "top rated" fills up with 10/10 titles that have 3 votes.
        params["vote_count.gte"] = isMovie ? 300 : 150;
        break;
      case "newest":
        params.sort_by = `${dateField}.desc`;
        params[`${dateField}.lte`] = today();
        params["vote_count.gte"] = 10;
        break;
      default:
        params.sort_by = "popularity.desc";
    }

    data = await apiClient<BrowseMediaPage>(
      isMovie ? API_MOVIE_CATEGORY : API_TV_CATEGORY,
      { params }
    );
  }

  return {
    ...data,
    results: Array.isArray(data.results) ? data.results : [],
    total_pages: Math.min(data.total_pages ?? 0, TMDB_MAX_PAGE),
  };
}

export { getBrowseMedia };
