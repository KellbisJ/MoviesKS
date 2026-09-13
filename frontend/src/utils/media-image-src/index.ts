const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

/**
 * Resolve a TMDB image path to a full URL.
 */
const mediaImageSrc = (path: string, size: string): string => {
  if (!path) return "";
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
};

export { mediaImageSrc };