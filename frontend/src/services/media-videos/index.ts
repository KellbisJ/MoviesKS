import { apiClient, API_MEDIA_VIDEOS } from "../index";
import { MediaVideosInterface } from "./types";
import { MediaTypeT } from "@/types/media-type";

async function getMediaVideos(
  type: `${MediaTypeT}`,
  id: string
): Promise<MediaVideosInterface> {
  try {
    const media = await apiClient<MediaVideosInterface>(
      API_MEDIA_VIDEOS(type, id)
    );

    if (media?.id && media?.results?.length > 0) {
      return media;
    }
    return {
      id: parseInt(id, 10),
      results: [],
    };
  } catch (error) {
    console.error("Error fetching media videos:", error);
    return {
      id: parseInt(id, 10),
      results: [],
    };
  }
}

export { getMediaVideos };
