import { API_MOVIE_DETAIL, API_TV_DETAIL, apiClient } from "../index";
import { MovieDetailInterface, TVDetailInterface } from "./types";
import { MediaTypeT } from "@/types/media-type";

async function getMediaDetail(
  type: `${MediaTypeT}`,
  id: string
): Promise<MovieDetailInterface | TVDetailInterface> {
  try {
    const apiUrl =
      type === MediaTypeT.movie ? API_MOVIE_DETAIL(id) : API_TV_DETAIL(id);
    const media = await apiClient<MovieDetailInterface | TVDetailInterface>(
      apiUrl
    );
    return media;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { getMediaDetail };
