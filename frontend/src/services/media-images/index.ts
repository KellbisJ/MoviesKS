import { MediaTypeT } from "@/types/media-type";
import { API_MEDIA_IMAGES, apiClient } from "../index";
import { MediaImagesInterface } from "./types";

async function getMediaImages(
  type: `${MediaTypeT}`,
  id: string
): Promise<MediaImagesInterface> {
  try {
    const media = await apiClient<MediaImagesInterface>(
      API_MEDIA_IMAGES(type, id)
    );
    return media;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { getMediaImages };
