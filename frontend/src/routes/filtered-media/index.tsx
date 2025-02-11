import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getPreviewTrendingMedia } from "@/services/preview-trending-media";
import { getMediaByCategory } from "@/services/media-by-category";
import { CreateMedia } from "@/components/create-media";
// import { FilteredMediaInterface } from "@/types/filtered-media-interface";
import { MovieInterface, TVInterface } from "@/types/movie-and-tv-interface";
import { MediaSkeleton } from "@/components/loading-skeletons";

const FilteredMedia = () => {
  const location = useLocation()
  const { type, id } = useParams();

  const mediaType = type as string
  const mediaIdGenre = id as string

  
  const [loadingComponents, setLoadingComponents] = useState(true);
  const [media, setMedia] = useState<MovieInterface[] | TVInterface[]>([])
  

 useEffect(() => {
  const fetchMedia = async () => {
    setLoadingComponents(true);
    try {
      let mediaFilteredData: MovieInterface[] | TVInterface[];
      if (location.pathname.includes("/preview/genre/")) {
        const mediaFiltered = await getMediaByCategory(mediaType, mediaIdGenre);
        mediaFilteredData = mediaFiltered.results; // top rated and popular media in a future will be filter
      } else {
        const mediaFiltered = await getPreviewTrendingMedia(mediaType);
        mediaFilteredData = mediaFiltered.results;
      }
      setMedia(mediaFilteredData);
    } catch (error) {
      console.error("Error fetching media:", error);
    } finally {
      setLoadingComponents(false);
    }
  };
  fetchMedia();
}, [location, mediaType, mediaIdGenre]); // This works. I was so close damn
  
  return (
		<>
			{loadingComponents ? (
				<MediaSkeleton />
			) : (
					<CreateMedia media={media} type={mediaType} />
			)}
		</>
	);
}

export {FilteredMedia}