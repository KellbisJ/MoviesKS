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
    if (location.pathname.includes(mediaType)) {
      const fetchMediaFiltered = async () => {
        const mediaFiltered = await getPreviewTrendingMedia(mediaType)
        const mediaFilteredData = mediaFiltered.results
        setMedia(mediaFilteredData)
      }
      setLoadingComponents(false)
      fetchMediaFiltered()
    } else if (location.pathname.includes(`${mediaType}/${mediaIdGenre}`)) {
      const fetchMediaFiltered = async () => {
        const mediaFiltered = await getMediaByCategory(mediaType, mediaIdGenre)
        const mediaFilteredData = mediaFiltered.results
        setMedia(mediaFilteredData)
      }
      setLoadingComponents(false)
      fetchMediaFiltered()
    } else {
      console.error('no valid filter')
    }
  }, [location, type, id])
  
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