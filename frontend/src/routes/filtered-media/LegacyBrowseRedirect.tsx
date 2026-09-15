import { Navigate, useParams } from "react-router-dom";
import { useValidMediaType } from "@/hooks/use-valid-media-type";

/**
 * Old browse URLs (/movie/all, /movie/preview/genre/:id, /movie/all/category/:id)
 * still circulate in bookmarks; send them to the single browse page.
 */
const LegacyBrowseRedirect = () => {
  const type = useValidMediaType();
  const { id } = useParams();
  const genre = id && /^\d+$/.test(id) ? `?genres=${id}` : "";
  return <Navigate to={`/${type}${genre}`} replace />;
};

export { LegacyBrowseRedirect };
