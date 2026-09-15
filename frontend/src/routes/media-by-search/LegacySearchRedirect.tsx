import { Navigate, useSearchParams } from "react-router-dom";
import { useValidMediaType } from "@/hooks/use-valid-media-type";
import { searchPath } from "./search-path";

/**
 * /search/discover/:type?query=… was an older copy of the title search that
 * only showed the first page. Old links land on the full results page instead.
 */
const LegacySearchRedirect = () => {
  const type = useValidMediaType();
  const query = (useSearchParams()[0].get("query") ?? "").trim();
  return <Navigate to={query ? searchPath(type, query) : "/"} replace />;
};

export { LegacySearchRedirect };
