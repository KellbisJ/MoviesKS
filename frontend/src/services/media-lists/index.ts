import { apiClient, API_MEDIA_LISTS } from "../index";
import {
  MoviesListInterface,
  TvSeriesListInterface,
  ListTypeMovies,
  ListTypeTvSeries,
} from "./types";
import { MediaTypeT } from "@/types/media-type";

interface BaseMediaListInterface<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

async function getMediaLists(
  page: number,
  type: MediaTypeT.movie,
  listType: ListTypeMovies
): Promise<BaseMediaListInterface<MoviesListInterface>>;

async function getMediaLists(
  page: number,
  type: MediaTypeT.tv,
  listType: ListTypeTvSeries
): Promise<BaseMediaListInterface<TvSeriesListInterface>>;

async function getMediaLists(
  page: number,
  type: MediaTypeT.movie | MediaTypeT.tv,
  listType: ListTypeMovies | ListTypeTvSeries
): Promise<
  | BaseMediaListInterface<MoviesListInterface>
  | BaseMediaListInterface<TvSeriesListInterface>
> {
  try {
    const apiUrl = API_MEDIA_LISTS(type, listType);

    return await apiClient<
      | BaseMediaListInterface<MoviesListInterface>
      | BaseMediaListInterface<TvSeriesListInterface>
    >(apiUrl, { params: { page } });
  } catch (error) {
    throw new Error(`error: ${error}`);
  }
}

export { getMediaLists };
